const mongoose = require('mongoose');

/**
 * Employee Schema - Professionally designed to match the provided dataset
 * while supporting advanced analytics and scaling.
 */
const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: [true, 'Employee ID is required'],
      unique: true,
      trim: true,
      alias: 'id', // Maps to 'id' in JSON
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    profile: {
      contact: {
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
          lowercase: true,
        },
        phone: String,
        address: {
          street: String,
          city: String,
          location: {
            state: String,
            country: String,
            geo: {
              lat: String,
              long: String,
              timezone: {
                name: String,
                utc_offset: String,
              },
            },
          },
        },
      },
      projects: [
        {
          projectId: String,
          name: String,
          tasks: [
            {
              taskId: String,
              description: String,
              assignedTo: {
                id: String,
                name: String,
                skills: {
                  primary: String,
                  secondary: [String],
                  experience: {
                    years: Number,
                    domains: [String],
                    certifications: {
                      current: [String],
                      expired: [String],
                      meta: {
                        verified: Boolean,
                        lastUpdated: String,
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      ],
    },
    // Additional Professional Fields (Not in original dataset, but required for system)
    role: {
      type: String,
      enum: ['Developer', 'Designer', 'Manager', 'Analyst', 'HR'],
      default: 'Developer',
    },
    salary: {
      type: Number,
      default: 50000,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Active', 'On Leave', 'Terminated'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// --- INDEXING STRATEGY ---
// Optimization for Search
employeeSchema.index({ name: 'text', 'profile.contact.email': 1 });

// Optimization for Filtering & Analytics
employeeSchema.index({ 'profile.contact.address.location.country': 1 });
employeeSchema.index({ 'profile.projects.tasks.assignedTo.skills.primary': 1 });
employeeSchema.index({ employeeId: 1 });

// --- VIRTUALS FOR EASIER ACCESS ---
employeeSchema.virtual('email').get(function () {
  return this.profile.contact.email;
});

employeeSchema.virtual('country').get(function () {
  return this.profile.contact.address.location.country;
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
