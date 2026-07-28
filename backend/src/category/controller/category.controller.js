const categoryModel = require("../model/category.model");

async function createCategory(req, res) {
    try {
        const { title, description, long_description } = req.body;
        let category_image = req.body.category_image;
        if (req.file) {
            category_image = `/uploads/${req.file.filename}`;
        }
        const category = await categoryModel.create({ title, category_image, description, long_description });
        res.status(201).json({ message: "Category created successfully", category });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function getAllCategories(req, res) {
    try {
        const categories = await categoryModel.find();
        res.status(200).json({ categories });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function getCategory(req, res) {
    try {
        const category = await categoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ category });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function updateCategory(req, res) {
    try {
        let updateData = { ...req.body };
        if (req.file) {
            updateData.category_image = `/uploads/${req.file.filename}`;
        }
        const category = await categoryModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category updated successfully", category });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function deleteCategory(req, res) {
    try {
        const category = await categoryModel.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully", category });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory };
