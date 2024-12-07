function checkAdminKey(req, res, next) {
    const adminKey = req.headers['x-admin-key'];
  
    if (!adminKey || adminKey !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
  
    next();
  }
  
  module.exports = { checkAdminKey };