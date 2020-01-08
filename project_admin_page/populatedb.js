var Product = require('./models/product');
var Role = require('./models/role');
var User = require('./models/user');
var Category = require('./models/category');
var Bill = require('./models/bill');
var DetailBill = require('./models/detail-bill');
var Comment = require('./models/comment');
// Get arguments passed on command line
var userArgs = process.argv.slice(2);
var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



var categories = [
    new Category({
        name: 'ĐỒ NAM',
       
    }),

    new Category({
        name: 'ĐỒ NỮ',
        
    }),

    new Category({
        name: 'ĐỒ TRẺ CON',
       
    })



]

for (var i = 0; i < categories.length; i++) {
    categories[i].save(function (err, result) {
    });
}

var products = [
    new Product({
        image: 'https://p.w3layouts.com/demos/21-03-2016/best_store/web/images/19.jpg',
       
        name: 'Áo sơ mi nam',
        description: 'Sang trọng, phong cách mạnh mẽ',
        price: 500000,
        category: categories[0]
    }),

    new Product({
        image: 'https://p.w3layouts.com/demos/21-03-2016/best_store/web/images/21.jpg',
       
        name: 'Giày lười nam',
        description: 'Sang trọng, phong cách mạnh mẽ',
        price: 300000,
        category: categories[0]
    }),

    new Product({
        image: 'https://p.w3layouts.com/demos/21-03-2016/best_store/web/images/24.jpg',
        
        name: 'Áo khoác nam',
        description: 'Sang trọng, phong cách mạnh mẽ',
        price: 600000,
        category: categories[0]
    }),

    new Product({
        image: 'https://p.w3layouts.com/demos/21-03-2016/best_store/web/images/7.jpg',
        
        name: 'Áo sơ mi nữ',
        description: 'Sang trọng, phong cách mạnh mẽ',
        price: 400000,
        category: categories[1]
    }),

    new Product({
        image: 'https://p.w3layouts.com/demos/21-03-2016/best_store/web/images/22.jpg',
        
        name: 'Giày nữ',
        description: 'Sang trọng, phong cách mạnh mẽ',
        price: 200000,
        category: categories[1]
    }),
    new Product({
        image: 'https://p.w3layouts.com/demos/21-03-2016/best_store/web/images/25.jpg',
        
        name: 'Áo khoác nữ',
        description: 'Sang trọng, phong cách mạnh mẽ',
        price: 700000,
        category: categories[1]
    }),

    new Product({
        image: 'https://p.w3layouts.com/demos/21-03-2016/best_store/web/images/20.jpg',
       
        name: 'Áo sơ mi nam',
        description: 'Sang trọng, phong cách mạnh mẽ',
        price: 1000000,
        category: categories[0]
    }),

    new Product({
        image: 'https://p.w3layouts.com/demos/21-03-2016/best_store/web/images/23.jpg',
        
        name: 'Giày thể thao nam',
        description: 'Sang trọng, phong cách mạnh mẽ',
        price: 900000,
        category: categories[0]
    }),

    new Product({
        image: 'https://p.w3layouts.com/demos/21-03-2016/best_store/web/images/26.jpg',
        
        name: 'Áo khoác ngoài',
        description: 'Sang trọng, phong cách mạnh mẽ',
        price: 1200000,
        category: categories[2]
    }),
    new Product({
        image: '/images/36.jpg',
        
        name: 'Đồng hồ nam',
        description: 'Sang trọng, phong cách mạnh mẽ',
        price: 1200000,
        category: categories[0]
    }),

    new Product({
        image: '/images/35.jpg',
        
        name: 'Đồng hồ nữ',
        description: 'Sang trọng, phong cách mạnh mẽ',
        price: 1200000,
        category: categories[1]
    }),
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function (err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}


var roles = [
    new Role({
        name: 'ROLE_ADMIN',
        description: 'Quản trị hệ thống'
    }),

    new Role({
        name: 'ROLE_MANAGER',
        description: 'Quản lý'
    }),

    new Role({
        name: 'ROLE_USER',
        description: 'Người dùng'
    }),
    new Role({
        name: 'ROLE_EMPLOYEE',
        description: 'Nhân viên'
    })



]

for (var i = 0; i < roles.length; i++) {
    roles[i].save(function (err, result) {
    });
}
var users = [
    new User({
        username: 'super admin',
        email: 'superadmin@gmail.com',
        password: '123456',
        role:  roles[0],
        isDelete:true
    }),
    new User({
        username: 'user',
        email: 'user@gmail.com',
        password: '123456',
        role:  roles[2],
        isDelete:true
    })


]
for (var i = 0; i < users.length; i++) {
    users[i].save(function (err, result) {
    });
}

var bills = [
    new Bill({
        dateBill:  '2020-01-07',
        user: users[1]  ,
        price:  100000,
    }),
    new Bill({
        dateBill:  '2020-01-06',
        user: users[1]  ,
        price:  100000,
    }),
    new Bill({
        dateBill:  '2020-01-05',
        user: users[1]  ,
        price:  100000,
    })
]
for (var i = 0; i < bills.length; i++) {
    bills[i].save(function (err, result) {
    });
}


var detailBills = [
    new DetailBill({
        bill:  bills[2],
        product:  products[0],
        quantity:  1,
    }),
    new DetailBill({
        bill:  bills[2],
        product:  products[1],
        quantity:  1,
    }),
    new DetailBill({
        bill:  bills[1],
        product:  products[3],
        quantity:  1,
    }),
    new DetailBill({
        bill:  bills[0],
        product:  products[4],
        quantity:  1,
    })
]
for (var i = 0; i < detailBills.length; i++) {
    detailBills[i].save(function (err, result) {
    });
}



var comments = [
    new Comment({
        content: 'aaaaaaaa',
        product: products[0],
        user: users[1]
    }),
    new Comment({
        content: 'bbbbbbbbb',
        product: products[1],
        user: users[1]
    }),
    new Comment({
        content: 'ccccccc',
        product: products[2],
        user: users[1]
    })
]
for (var i = 0; i < comments.length; i++) {
    comments[i].save(function (err, result) {
    });
}



function exit() {
    mongoose.disconnect();
}

