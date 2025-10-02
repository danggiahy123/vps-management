const jwt = require('jsonwebtoken');

// JWT Secret (phải giống với auth routes)
const JWT_SECRET = 'vps-management-secret-key-2024';

// Middleware xác thực JWT
const authenticateToken = (req, res, next) => {
  try {
    // Lấy token từ header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token không được cung cấp'
      });
    }

    // Verify token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Token không hợp lệ hoặc đã hết hạn'
        });
      }

      // Thêm thông tin user vào request
      req.user = decoded;
      next();
    });

  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi xác thực'
    });
  }
};

// Middleware kiểm tra quyền admin
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Chưa xác thực'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Chỉ admin mới có quyền truy cập'
    });
  }

  next();
};

// Middleware kiểm tra quyền user hoặc admin
const requireUserOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Chưa xác thực'
    });
  }

  if (req.user.role !== 'user' && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Không có quyền truy cập'
    });
  }

  next();
};

// Middleware kiểm tra quyền sở hữu resource
const requireOwnershipOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Chưa xác thực'
    });
  }

  // Admin có thể truy cập tất cả
  if (req.user.role === 'admin') {
    return next();
  }

  // User chỉ có thể truy cập resource của mình
  const resourceUserId = req.params.userId || req.body.userId;
  
  if (req.user.userId.toString() !== resourceUserId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Chỉ có thể truy cập resource của chính mình'
    });
  }

  next();
};

module.exports = {
  authenticateToken,
  requireAdmin,
  requireUserOrAdmin,
  requireOwnershipOrAdmin
};
