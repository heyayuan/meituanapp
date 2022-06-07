require('../models/db')
//创建category集合
const Category = require('../models/Category')
//利用数据模型实例化一个对象
const Restaurant = require('../models/Restaurant')

exports.homepage = async(req,res) => {
    try{
        //从数据库读取category集合里的数据：[]数组
        const categories = await Category.find()
        //从Restaurant集合中读取全部数据
        // const restaurants = await Restaurant.find().limit(5)
        // const stars = await Restaurant.find().sort({stars:-1}).limit(5)
        // const distance = await Restaurant.find({category:"火锅"}).sort({distance:1})
    res.render('index',{title:'MT外卖 - 首页',categories})
    }catch(error){
        res.status(500).send(error.message)
    }
}  

exports.loadmore = async(req,res) => {
    const skipNum = parseInt(req.body.skipNum)
    const restaurants = await Restaurant.find().skip(skipNum).limit(5)
    res.json(restaurants)
}  



exports.addRestaurant = async(req,res) => {
    res.render('add-restaurant',{title:'添加餐馆 - MT外卖'})
}  

exports.addRestaurantPost = async(req,res) => {
    let imageUploadFile,uploadPath,newImageName
        //获取图片名称
        imageUploadFile = req.files.photo
        //重命名
        newImageName = Date.now() + imageUploadFile.name
        //确定图片存放的路径
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName
        //把上传的图片放入指定位置
        imageUploadFile.mv(uploadPath)
    try{
        const newRestaurant = new Restaurant({
            name:req.body.name,
            category:req.body.category,
            image:req.body.photo,
            desc:req.body.intro,
            averageCost:req.body.averageCost,
            promotion:req.body.promotion,
            featured:req.body.featured,
            address:req.body.address
        })
       await newRestaurant.save()
    }
    catch(error){
        res.json(error)
        res.redirect('/add-restaurant')
    }
} 



exports.sortRestaurant = async(req,res) => {
    try{
        // console.log(req.params)
        let categoryId = req.params.id
        res.render('restaurants',{title:'MT外卖 - 首页',categoryId})
    }catch(error){
        res.status(500).send(error.message)
    }
}  


exports.sortRestaurantPost = async(req,res) => {
    try{
        // console.log(req.params)
        let categoryId = req.params.id
        const restaurantList = await Restaurant.find({'category':categoryId}).limit(2)
        res.json(restaurantList)
    }catch(error){
        res.status(500).send(error.message)
    }
}  


exports.showRestaurant = async(req,res) => {
    try{
        // console.log(req.params)
        let categoryId = req.params.id
        const restaurant = await Restaurant.find({"_id":categoryId})
        res.render('restaurant',{title:'MT外卖 - 首页',restaurant})
    }catch(error){
        res.status(500).send(error.message)
    }
}



exports.searchPost = async(req,res) => {
    try{
        let keyword = req.body.mykeyword
        const searchResult = await Restaurant.find({$text:{$search:keyword}})
        res.render('search',{title:'搜索结果',searchResult})
    }catch(error){
        res.status(500).send(error.message)
    }
} 