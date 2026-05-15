const express = require('express');
const lc = require('../../controllers/literal.controller');
const router = express.Router();

// --- 1. Basic CRUD ---
router.get('/', lc.getAllLiteral);
router.post('/', lc.practice('Create'));
router.get('/:id', lc.getOneLiteral);
router.put('/:id', lc.practice('Update'));
router.delete('/:id', lc.practice('Delete'));

// --- 2. Employee Info ---
router.get('/exists/:id', lc.practice('Exists Check'));
router.get('/name/:val', lc.lookup('name'));
router.get('/state/:val', lc.nestedLookup('profile.contact.address.location.state'));
router.get('/country/:val', lc.nestedLookup('profile.contact.address.location.country'));
router.get('/city/:val', lc.nestedLookup('profile.contact.address.location.city'));
router.get('/timezone/:val', lc.nestedLookup('profile.contact.address.location.geo.timezone.name'));
router.get('/primary-skill/:val', lc.nestedLookup('profile.projects.tasks.assignedTo.skills.primary'));
router.get('/secondary-skill/:val', lc.practice('Secondary Skill Lookup'));
router.get('/domain/:val', lc.nestedLookup('profile.projects.tasks.assignedTo.skills.experience.domains'));
router.get('/experience/:val', lc.nestedLookup('profile.projects.tasks.assignedTo.skills.experience.years'));
router.get('/certification/:val', lc.nestedLookup('profile.projects.tasks.assignedTo.skills.experience.certifications.current'));

// --- 3. Sorting ---
const sortFields = ['experience', 'salary', 'name', 'age', 'joining-date'];
sortFields.forEach(f => {
  router.get(`/sort/${f}-asc`, lc.practice(`Sort ${f} asc`));
  router.get(`/sort/${f}-desc`, lc.practice(`Sort ${f} desc`));
});

// --- 4. Filtering ---
const filters = ['high-experience', 'low-experience', 'verified-certification', 'domain-keyword', 'skill-set', 'state-wise', 'country-wise', 'city-wise', 'timezone-wise', 'salary-range'];
filters.forEach(f => router.get(`/filter/${f}`, lc.practice(`Filter ${f}`)));

// --- 5. Analytics ---
const analytics = ['skill-distribution', 'country-distribution', 'state-distribution', 'domain-distribution', 'certification-analytics', 'project-analytics', 'technology-analytics', 'timezone-analytics', 'location-analytics', 'experience-analytics', 'verification-analytics', 'task-analytics'];
analytics.forEach(a => router.get(`/analytics/${a}`, lc.practice(`Analytics ${a}`)));

// --- 6. Statistics ---
const stats = ['count', 'experience-average', 'top-experience', 'project-count', 'task-count', 'country-count', 'state-count', 'domain-count', 'skill-count', 'certification-count', 'timezone-count', 'verified-count', 'project-distribution', 'task-distribution', 'technology-count'];
stats.forEach(s => router.get(`/stats/${s}`, lc.practice(`Stat ${s}`)));

// --- 7. Middleware ---
const mid = ['logger', 'auth', 'rate-limit', 'error-handler', 'request-time', 'role-check', 'validation', 'audit-log', 'cache', 'compression', 'helmet', 'cors', 'body-parser', 'cookie-parser', 'session', 'passport', 'morgan', 'debug', 'trace', 'monitor', 'health', 'metrics'];
mid.forEach(m => router.get(`/middleware/${m}`, lc.practice(`Middleware ${m}`)));

// --- 8. Advanced Practice ---
const adv = ['random', 'trending-skills', 'recent', 'top-skills', 'cloud-engineers', 'devops-engineers', 'ai-engineers', 'fullstack', 'recent-certifications', 'top-performers', 'salary-stats', 'department-stats', 'domain-stats'];
adv.forEach(a => router.get(`/advanced/${a}`, lc.practice(`Advanced ${a}`)));

// --- 9. Auth & JWT ---
const auth = ['register', 'login', 'logout', 'profile', 'forgot-password', 'reset-password', 'change-password', 'verify-email', 'send-otp', 'verify-otp', 'resend-verification', 'update-profile', 'get-profile', 'delete-account', 'deactivate', 'reactivate', 'session', 'history', 'logs'];
auth.forEach(a => router.post(`/auth/${a}`, lc.practice(`Auth ${a}`)));
const jwt = ['token', 'verify', 'refresh', 'decode', 'check-expiry', 'blacklist', 'revoke', 'roles', 'permissions', 'validate', 'header', 'payload', 'signature', 'secret'];
jwt.forEach(j => router.get(`/jwt/${j}`, lc.practice(`JWT ${j}`)));

// --- 10. Error & System ---
const err = ['400', '401', '403', '404', '405', '408', '429', '500', '502', '503', '504', 'timeout', 'network', 'db-connection', 'validation-error'];
err.forEach(e => router.get(`/error/${e}`, lc.practice(`Error ${e}`)));
router.get('/system/health', lc.practice('Health'));
router.get('/system/version', lc.practice('Version'));
router.get('/system/config', lc.practice('Config'));

module.exports = router;
