class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Map custom dataset query params to nested MongoDB paths
    const mapping = {
      country: 'profile.contact.address.location.country',
      state: 'profile.contact.address.location.state',
      city: 'profile.contact.address.city',
      primarySkill: 'profile.projects.tasks.assignedTo.skills.primary',
      secondarySkill: 'profile.projects.tasks.assignedTo.skills.secondary',
      domain: 'profile.projects.tasks.assignedTo.skills.experience.domains',
      experience: 'profile.projects.tasks.assignedTo.skills.experience.years',
      verified: 'profile.projects.tasks.assignedTo.skills.experience.certifications.meta.verified',
      certification: 'profile.projects.tasks.assignedTo.skills.experience.certifications.current',
      timezone: 'profile.contact.address.location.geo.timezone.name',
      project: 'profile.projects.projectId',
      task: 'profile.projects.tasks.taskId',
      technology: 'profile.projects.tasks.assignedTo.skills.secondary',
      skill: 'profile.projects.tasks.assignedTo.skills.primary',
      emailVerified: 'isVerified'
    };

    const mappedQueryObj = {};
    for (const key in queryObj) {
      const mappedKey = mapping[key] || key;
      mappedQueryObj[mappedKey] = queryObj[key];
    }

    let queryStr = JSON.stringify(mappedQueryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    if (this.queryString.search) {
      const searchTerm = this.queryString.search;
      this.query = this.query.find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { employeeId: { $regex: searchTerm, $options: 'i' } },
        ],
      });
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const mapping = {
        name: 'name',
        experience: 'profile.projects.tasks.assignedTo.skills.experience.years',
        country: 'profile.contact.address.location.country',
        state: 'profile.contact.address.location.state',
        city: 'profile.contact.address.city',
        project: 'profile.projects.name',
        task: 'profile.projects.tasks.description',
        skill: 'profile.projects.tasks.assignedTo.skills.primary',
        timezone: 'profile.contact.address.location.geo.timezone.name',
        lastUpdated: 'profile.projects.tasks.assignedTo.skills.experience.certifications.meta.lastUpdated'
      };

      const sortBy = this.queryString.sort.split(',').map(field => {
        let cleanField = field.startsWith('-') ? field.substring(1) : field;
        let mappedField = mapping[cleanField] || cleanField;
        return field.startsWith('-') ? `-${mappedField}` : mappedField;
      }).join(' ');

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
