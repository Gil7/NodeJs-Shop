// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
// class User {
//     constructor(name, email, cart, id){
//         this.name = name;
//         this.email = email;
//         this.cart = { items: [...cart.items] };
//         this._id = id ? new mongodb.ObjectId(id) : null;
//     }
//     save(){
//         const db = getDb();
//         let opDb;
//         if(this._id){
            
//         }
//         else {
//             opDb = db.collection('users').insertOne(this);
//         }
//         return opDb.then(result => {
//             console.log(result)
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     }
//     addToCart(product){
//         const productCartIndex = this.cart.items.findIndex( pc => pc.productId.toString() === product._id.toString());
//         let newQuantity = 1;
//         const updatedCartItems = [...this.cart.items];
//         if(productCartIndex >= 0){
//             newQuantity = this.cart.items[productCartIndex].quantity + 1;
//             updatedCartItems[productCartIndex].quantity = newQuantity;
//         }
//         else {
//             updatedCartItems.push({
//                 productId: new mongodb.ObjectId(product._id),
//                 quantity: newQuantity
//             })
//         }
//         const updatedCart = { items: updatedCartItems }
//         const db = getDb();
//         return db
//             .collection('users')
//             .updateOne(
//                 { _id: this._id },
//                 {$set: { cart : updatedCart }}
//             );

//     }
//     getCart(){
//         const db = getDb();
//         const productIds = this.cart.items.map( item => item.productId)
//         return db.collection('products')
//             .find({ _id: { $in : productIds } }).toArray()
//             .then(products => {
//                 return products.map( pro => {
//                     return {
//                         ...pro,
//                         quantity: this.cart.items.find( p => p.productId.toString() === pro._id.toString()).quantity
//                     }
//                 })
//             })
//             .catch(err => console.log(err));
//     }
//     removeItemFromCart(productId){
//         const db = getDb();
//         const updatedCart = this.cart.items.filter( item => item.productId.toString() !== productId.toString())
//         return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: { items: updatedCart }}})
//             .then(result => {
//                 console.log(result);
//             })
//             .catch(err => console.log(err));
//     }
//     getOrders(){
//         const db = getDb();
//         return db.collection('orders').find({ 'user._id': this._id }).toArray();
//     }
//     addOrder(){
//         const db = getDb();
//         return this.getCart()
//             .then(products => {
//                 const order = {
//                     items: products,
//                     user: {
//                         _id: this._id,
//                         name:this.name
//                     }
//                 }
//                 return db.collection('orders').insertOne(order)
//             })
//             .then(result => {
//                 this.cart = { items: [] };
//                 return db.collection('users')
//                     .updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
//             })
//             .catch(err => console.log(err));
//     }
//     static findById(id){
//         const db = getDb();
//         return db.collection('users').findOne({_id : new mongodb.ObjectId(id)});
        
//     }
// }
// module.exports = User;