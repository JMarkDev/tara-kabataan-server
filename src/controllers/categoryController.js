const categoryModel = require('../models/categoryModel');
const date = require('date-and-time');
const { Op } = require("sequelize");
const fs = require('fs');

const addCategory = async (req, res) => {
    const { category_name } = req.body;
    try {
        let filetype = req.file.mimetype.split('/')[1];
        let newFileName = req.file.filename + '.' + filetype;
        fs.rename(`./uploads/${req.file.filename}`, `./uploads/${newFileName}`, async (err) => {
            if(err) throw err;
            console.log('uploaded successfully')
        })

        const existCategory = await categoryModel.findOne({ where: { category_name: category_name } });
        if (existCategory) {
            return res.status(400).json({ status: 'error', message: 'Category already exists' });
        }
        
        const newCategory = await categoryModel.create({
            category_name: category_name,
            image: `/uploads/${newFileName}`
        })
        return res.status(201).json({
            status: 'success',
            message: 'Category added successfully',
            newCategory
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: 'Add category error in server' });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.findAll();
        return res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: 'Get all categories error in server' });
    }
}

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await categoryModel.findOne({ where: { id: id } });
        return res.status(200).json(category);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: 'Get category by id error in server' });
    }
}

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { category_name } = req.body;
    try {
        let newFileName = null;

        if (req.file) {
            let fileType = req.file.mimetype.split('/')[1];
            newFileName = req.file.filename + '.' + fileType;

            fs.rename(`./uploads/${req.file.filename}`, `./uploads/${newFileName}`, function (err) {
                if (err) throw err;
                console.log('Uploaded Success');
            });
        }

        const updatedAt = new Date()
        const formattedDate = date.format(updatedAt, 'YYYY-MM-DD HH:mm:ss') ; 
        

        const updatedCategory = await categoryModel.update(
            { 
                category_name: category_name,
                image: `/uploads/${newFileName}`,
                updated_at: formattedDate
            }, 
            { where: { id: id } });

        return res.status(200).json({
            status: 'success',
            message: 'Category updated successfully',
            updatedCategory
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: 'Update category error in server' });
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await categoryModel.destroy({ where: { id: id } });
        return res.status(200).json({
            status: 'success',
            message: 'Category deleted successfully',
            deletedCategory
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: 'Delete category error in server' });
    }
}

const searchCategory = async (req, res) => {
    const { category_name } = req.params;
    try {
        
        const searchCriteria = {
            where: {
                category_name: { [Op.like]: `${category_name}%` }, // Use LIKE for partial matches
            },
        }

        const category = await categoryModel.findAll(searchCriteria);
        return res.status(200).json(category)
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Search category error in server'})
    }
}

const paginationCategory = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
        try{
            const data = await categoryModel.findAndCountAll({ where: {}, limit, offset })
            const response = getPagingData(data, page, limit);
            res.send(response);
        } catch (error) {
            console.error(error)
            return res.status(500).json({Error: 'Pagination category error in server'})
        }
}

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? (page - 1) * limit : 0;
    return { limit, offset };
}

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: category } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, category, totalPages, currentPage };
}

module.exports = {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    searchCategory,
    paginationCategory
}