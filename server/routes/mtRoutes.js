const express = require('express')
const router = express.Router()
const mtController = require('../controllers/mtController')

router.get('/',mtController.homepage)
//上滑加载更多
router.post('/load-more',mtController.loadmore)
router.get('/add-restaurant',mtController.addRestaurant)
router.post('/add-restaurant',mtController.addRestaurantPost)
//渲染页面restaurant.ejs,同时要把id传入页面
router.get('/category/:id',mtController.sortRestaurant)
router.post('/category/:id',mtController.sortRestaurantPost)
router.get('/restaurants/:id',mtController.showRestaurant)
router.post('/search',mtController.searchPost)
module.exports = router