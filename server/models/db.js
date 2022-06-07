const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/meituan')
    .then(() => console.log('连接数据库成功...'))
    .catch(err => console.error('连接数据库失败' + err))


