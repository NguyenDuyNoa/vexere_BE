const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Thêm route GET để lấy danh sách users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      message: 'Lỗi khi lấy danh sách người dùng',
      error: error.message 
    });
  }
});

// Route POST hiện tại của bạn
router.post('/users', async (req, res) => {
  try {
    const { name, email, role, status } = req.body;
    
    // Validate dữ liệu
    if (!name || !email) {
      return res.status(400).json({ 
        message: 'Tên và email là bắt buộc' 
      });
    }

    const newUser = await User.create({
      name,
      email,
      role: role || 'user',
      status: status !== undefined ? status : true
    });

    res.status(201).json({
      message: 'Tạo người dùng thành công',
      user: newUser
    });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ 
      message: 'Lỗi khi tạo người dùng',
      error: error.message 
    });
  }
});

// Thêm route DELETE để xóa user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: { id }
    });
    res.json({ message: 'Xóa người dùng thành công' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ 
      message: 'Lỗi khi xóa người dùng',
      error: error.message 
    });
  }
});

module.exports = router;
