const mongoose=require('mongoose');
const Product=require('./models/Product');
const User=require('./models/User');

let products=[
    {
        name:'Iphone',
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxIxzUa9VIhuzsRypobbKuSdhNoZN2zyGtUg&s",
        price:150000,
        desc:"Pink in color"
    },
    {
        name:'Tumbler',
        img:"https://5.imimg.com/data5/SELLER/Default/2024/5/423241560/TK/FS/RW/13229338/tumbler-with-lid-and-straw-sipper-with-straw-insulated-coffee-tumbler-steel-tumbler-lid-leak-proof.jpg",
        price:1500,
        desc:"black tumbler"
    },
    {
        name:'Headphone',
        img:"https://media.tatacroma.com/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/271047_0_yaama6.png",
        price:15000,
        desc:"blue headphones"
    },
    {
        name:'Cups',
        img:"https://m.media-amazon.com/images/I/61V0wEzSdvL._UF894,1000_QL80_.jpg",
        price:150000,
        desc:"white cups"
    },
    {
        name:'Tablet',
        img:"https://media.tatacroma.com/Croma%20Assets/Computers%20Peripherals/Tablets%20and%20iPads/Images/249484_0_jyr8ll.png",
        price:30000,
        desc:"Samsung tablet"
    }
]

async function seedDB(){
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    
    // Insert products
    await Product.insertMany(products);
    
    // Create admin user
    const adminUser = new User({
        username: 'admin',
        email: 'admin@ecomart.com',
        password: 'admin123',
        role: 'admin'
    });
    await adminUser.save();
    
    // Create regular user
    const regularUser = new User({
        username: 'user',
        email: 'user@ecomart.com',
        password: 'user123',
        role: 'user'
    });
    await regularUser.save();
    
    console.log('✅ Database seeded successfully!');
}

module.exports=seedDB;