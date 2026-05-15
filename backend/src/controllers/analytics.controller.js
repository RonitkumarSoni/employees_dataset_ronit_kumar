const analyticsService = require('../services/analytics.service');
const asyncHandler = require('../utils/asyncHandler');

exports.getStats = asyncHandler(async (req, res) => {
  const stats = await analyticsService.getGeneralStats();
  res.status(200).json({
    status: 'success',
    data: { stats },
  });
});

exports.getSkillStats = asyncHandler(async (req, res) => {
  const distribution = await analyticsService.getSkillDistribution();
  res.status(200).json({
    status: 'success',
    data: { distribution },
  });
});

exports.getCountryStats = asyncHandler(async (req, res) => {
  const distribution = await analyticsService.getCountryDistribution();
  res.status(200).json({
    status: 'success',
    data: { distribution },
  });
});

exports.getDomainStats = asyncHandler(async (req, res) => {
  const stats = await analyticsService.getDomainStats();
  res.status(200).json({
    status: 'success',
    data: { stats },
  });
});
