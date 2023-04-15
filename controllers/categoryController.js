const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const slugify = require('slugify');
const CategoryModel = require('../models/CategoryModel');

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new ErrorHandler('category name is required', 400));
  }
  const existingCategory = await CategoryModel.findOne({ name });
  if (existingCategory) {
    return next(new ErrorHandler('Category already exists', 200));
  }
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  return res
    .status(201)
    .json({ success: true, message: 'New Category Created', category });
});

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );
  res.status(200).json({
    success: true,
    message: 'Category Updated Successfully',
    category,
  });
});

exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const cateogries = await CategoryModel.find({});
  return res.status(200).json({
    success: true,
    message: 'All Categories Listed',
    cateogries,
  });
});

exports.getSingleCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await CategoryModel.findOne({ slug: req.params.slug });
  if (!category) {
    return next(
      new ErrorHandler('Error While getting category with this slug', 400)
    );
  }
  return res.status(200).json({
    success: true,
    message: 'Single Category Fetched Successfully',
    category,
  });
});

exports.deleteCategory = catchAsyncErrors(async (req, res) => {
  await CategoryModel.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    success: true,
    message: 'Category Deleted Successfully',
  });
});
