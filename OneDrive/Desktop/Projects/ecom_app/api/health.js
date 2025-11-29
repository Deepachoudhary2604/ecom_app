// Simple Vercel serverless function for health checks
module.exports = (req, res) => {
  res.status(200).json({ ok: true, source: 'vercel-function', now: Date.now() });
};
