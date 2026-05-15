const analyticsService = require('../services/analytics.service');
const asyncHandler = require('../utils/asyncHandler');

exports.getStats = asyncHandler(async (req, res) => {
  const stats = await analyticsService.getGeneralStats();
  res.status(200).json({ status: 'success', data: { stats } });
});

exports.getSkillDistribution = asyncHandler(async (req, res) => {
  const distribution = await analyticsService.getSkillDistribution();
  res.status(200).json({ status: 'success', results: distribution.length, data: { distribution } });
});

exports.getCountryAnalysis = asyncHandler(async (req, res) => {
  const distribution = await analyticsService.getCountryDistribution();
  res.status(200).json({ status: 'success', results: distribution.length, data: { distribution } });
});

exports.getStateAnalysis = asyncHandler(async (req, res) => {
  const distribution = await analyticsService.getStateDistribution();
  res.status(200).json({ status: 'success', results: distribution.length, data: { distribution } });
});

exports.getDomainDistribution = asyncHandler(async (req, res) => {
  const distribution = await analyticsService.getDomainDistribution();
  res.status(200).json({ status: 'success', results: distribution.length, data: { distribution } });
});

exports.getCertificationAnalytics = asyncHandler(async (req, res) => {
  const analytics = await analyticsService.getCertificationAnalytics();
  res.status(200).json({ status: 'success', results: analytics.length, data: { analytics } });
});

exports.getProjectAnalytics = asyncHandler(async (req, res) => {
  const analytics = await analyticsService.getProjectAnalytics();
  res.status(200).json({ status: 'success', results: analytics.length, data: { analytics } });
});

exports.getTechnologyAnalytics = asyncHandler(async (req, res) => {
  const analytics = await analyticsService.getTechnologyAnalytics();
  res.status(200).json({ status: 'success', results: analytics.length, data: { analytics } });
});

exports.getTimezoneAnalysis = asyncHandler(async (req, res) => {
  const analytics = await analyticsService.getTimezoneAnalytics();
  res.status(200).json({ status: 'success', results: analytics.length, data: { analytics } });
});

exports.getLocationAnalysis = asyncHandler(async (req, res) => {
  const analytics = await analyticsService.getLocationAnalytics();
  res.status(200).json({ status: 'success', results: analytics.length, data: { analytics } });
});

exports.getExperienceAnalysis = asyncHandler(async (req, res) => {
  const analytics = await analyticsService.getExperienceAnalytics();
  res.status(200).json({ status: 'success', results: analytics.length, data: { analytics } });
});

exports.getVerificationAnalysis = asyncHandler(async (req, res) => {
  const analytics = await analyticsService.getVerificationAnalytics();
  res.status(200).json({ status: 'success', results: analytics.length, data: { analytics } });
});

exports.getTaskAnalysis = asyncHandler(async (req, res) => {
  const analytics = await analyticsService.getTaskAnalytics();
  res.status(200).json({ status: 'success', results: analytics.length, data: { analytics } });
});
