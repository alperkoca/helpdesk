const asyncErrorWraper = require("express-async-handler");
const Category = require("../models/Category");
const Ticket = require("../models/Ticket");

const getCategories = asyncErrorWraper(async (req, res, next) => {
    
    const categories = await Category.find({})
    .populate({
        path: 'mainCategory',
        select: 'name'
    })
    .populate({
        path: "categories",
        select: "name"
    });

    res.status(200)
    .json({
        success:true,
        data: categories
    });

});

const createCategory = asyncErrorWraper(async (req, res, next) => {
    const user = req.user.id;
    const {name, blocked, mainCategory} = req.body;
    const createdCategory = await Category.create(
        {
            name,
            createdUser: user,
            updatedUser: user,
            blocked,
            mainCategory : mainCategory === "" ? undefined : mainCategory,
        }
    );

    if(mainCategory && mainCategory !== ""){
        const updatedmainCategory = await Category.findById(mainCategory);
        updatedmainCategory.categories.push(createdCategory._id);
        updatedmainCategory.save();
    }
        
    res.status(201).json({
        success:true,
        data: createdCategory
    })
});

const updateCategory = asyncErrorWraper(async (req, res, next) => {
    const user = req.user.id;
    const {name, blocked, mainCategory} = req.body;
    const {id} = req.params;

    const category = await Category.findById(id);
    if(category?.mainCategory !== '' && category?.mainCategory !== mainCategory)
    {
        const uMainCategory = await Category.findById(category.mainCategory);
        uMainCategory.categories = uMainCategory.categories.find(c=> c !== category._id);
        uMainCategory.save();
    }

    if(mainCategory && category?.mainCategory !== mainCategory && mainCategory != "")
    {
        const nMainCategory = await Category.findById(mainCategory);
        nMainCategory.categories.push(mainCategory);
        nMainCategory.save();
    }

    category.name = name;
    category.blocked = blocked;
    category.mainCategory = mainCategory;
    category.updatedUser = user;
    category.updatedAt = Date.now();
    category.save();
    res.status(200).json({
        success:true,
        data: category
    })
});

const deleteCategory = asyncErrorWraper(async (req, res, next) => {
    const {id} = req.params;

    await Ticket.deleteMany({category : id});
    await Category.findByIdAndDelete(id);
    
    res.status(200).json({
        success: true
    });
});

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}