const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const ErrorController = require('./controllers/error')
const sequelize = require('./util/database')
const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')
const User = require('./models/user')
const Product = require('./models/product')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop.js')
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'public')))

app.use('/admin', adminData.router)
app.use(shopRoutes)
app.use(ErrorController.get404)

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)

sequelize.sync({
    force: true
})
.then(result => {
    app.listen(port, () => {
        console.log(`Server listening at port: ${port}`)
    })
})
.catch(err => {
    console.log(err)
})
