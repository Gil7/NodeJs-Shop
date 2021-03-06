const Product = require('../models/product');
const { validationResult } = require('express-validator/check');
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
}
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const errors = validationResult(req)
    const product = new Product({
        title: title, 
        price: price, 
        description: description, 
        imageUrl: imageUrl,
        userId: req.user
    });
    product.save()
    .then(result => {
        console.log(result);
        return res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    })
}
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/')
    };
    const productId = req.params.id;
    Product.findById(productId)
    .then(product => {
        if(!product){
            return redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
        });
    })
    .catch(err => {
        console.log(err);
    })
}
exports.postEditProduct = (req, res, next) => {
    const productId = req.body.id;
    Product.findOneAndUpdate({_id: productId, userId: req.user._id.toString()}, req.body)
        .then(updatedProduct => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        })
}
exports.getProducts = (req, res, next) => {
    Product.find({userId : req.user._id.toString()})
    .populate('userId')
    .then(products => {
        console.log(products)
        res.render('admin/products', {
            products: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    })
    .catch(err => {
        console.log(err);
    })
}
exports.postDeleteProduct = (req, res, next) => {
    const productId = req.params.id
    Product.findOneAndDelete({ _id: productId, userId: req.user._id.toString()})
    .then(result => {
        return res.redirect('/admin/products');
    })
    .catch(err => console.log(err))    
}
