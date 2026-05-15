const statsService = require('../services/stats.service');
const asyncHandler = require('../utils/asyncHandler');

exports.getEmployeeCount = asyncHandler(async (req, res) => {
  const count = await statsService.getEmployeeCount();
  res.status(200).json({ status: 'success', data: { count } });
});

exports.getAverageExperience = asyncHandler(async (req, res) => {
  const average = await statsService.getAverageExperience();
  res.status(200).json({ status: 'success', data: { average } });
});

exports.getTopExperience = asyncHandler(async (req, res) => {
  const employee = await statsService.getTopExperience();
  res.status(200).json({ status: 'success', data: { employee } });
});

exports.getProjectCount = asyncHandler(async (req, res) => {
  const count = await statsService.getProjectCount();
  res.status(200).json({ status: 'success', data: { count } });
});

exports.getTaskCount = asyncHandler(async (req, res) => {
  const count = await statsService.getTaskCount();
  res.status(200).json({ status: 'success', data: { count } });
});

exports.getCountryCount = asyncHandler(async (req, res) => {
  const stats = await statsService.getCountryCount();
  res.status(200).json({ status: 'success', results: stats.length, data: { stats } });
});

exports.getStateCount = asyncHandler(async (req, res) => {
  const stats = await statsService.getStateCount();
  res.status(200).json({ status: 'success', results: stats.length, data: { stats } });
});

exports.getDomainCount = asyncHandler(async (req, res) => {
  const stats = await statsService.getDomainCount();
  res.status(200).json({ status: 'success', results: stats.length, data: { stats } });
});

exports.getSkillCount = asyncHandler(async (req, res) => {
  const stats = await statsService.getSkillCount();
  res.status(200).json({ status: 'success', results: stats.length, data: { stats } });
});

exports.getCertificationCount = asyncHandler(async (req, res) => {
  const stats = await statsService.getCertificationCount();
  res.status(200).json({ status: 'success', results: stats.length, data: { stats } });
});

exports.getTimezoneCount = asyncHandler(async (req, res) => {
  const stats = await statsService.getTimezoneCount();
  res.status(200).json({ status: 'success', results: stats.length, data: { stats } });
});

exports.getVerifiedCount = asyncHandler(async (req, res) => {
  const count = await statsService.getVerifiedCount();
  res.status(200).json({ status: 'success', data: { count } });
});

exports.getProjectDistribution = asyncHandler(async (req, res) => {
  const stats = await statsService.getProjectDistribution();
  res.status(200).json({ status: 'success', results: stats.length, data: { stats } });
});

exports.getTaskDistribution = asyncHandler(async (req, res) => {
  const stats = await statsService.getTaskDistribution();
  res.status(200).json({ status: 'success', results: stats.length, data: { stats } });
});

exports.getTechnologyCount = asyncHandler(async (req, res) => {
  const stats = await statsService.getTechnologyCount();
  res.status(200).json({ status: 'success', results: stats.length, data: { stats } });
});
