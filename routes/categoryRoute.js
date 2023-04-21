const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();
const {
  createCategory,
  updateCategory,
  getSingleCategory,
  getAllCategories,
  deleteCategory,
} = require('../controllers/categoryController');

// create category
router
  .route('/create-category')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createCategory);

// update category
router
  .route('/update-category/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateCategory);

// get all categories
router.route('/get-all-category').get(getAllCategories);

// get single category
router.route('/single-category-products/:id').get(getSingleCategory);

// delete category
router
  .route('/delete-category/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategory);

module.exports = router;
