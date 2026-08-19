const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");
require("dotenv").config();

const seedProducts = async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const categories = await Category.find();
    const categoryMap = {};
    categories.forEach((cat) => {
        categoryMap[cat.name] = cat._id;
    });

    const products = [
        // Electronics
        { name: "Wireless Headphones", description: "Bluetooth headphones with noise cancellation", price: 1999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", category: categoryMap["Electronics"], stock: 25 },
        { name: "Smart Watch", description: "Fitness smart watch with heart rate monitor", price: 2499, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", category: categoryMap["Electronics"], stock: 15 },
        { name: "Mechanical Keyboard", description: "RGB mechanical keyboard for gaming", price: 3499, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500", category: categoryMap["Electronics"], stock: 20 },
        { name: "Wireless Mouse", description: "Ergonomic wireless mouse", price: 899, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500", category: categoryMap["Electronics"], stock: 30 },
        { name: "USB-C Hub", description: "7-in-1 USB-C hub adapter", price: 1299, image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500", category: categoryMap["Electronics"], stock: 40 },
        { name: "Bluetooth Speaker", description: "Portable Bluetooth speaker", price: 1599, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500", category: categoryMap["Electronics"], stock: 18 },
        { name: "Laptop Stand", description: "Adjustable aluminum laptop stand", price: 999, image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c6?w=500", category: categoryMap["Electronics"], stock: 22 },
        { name: "Webcam HD", description: "1080p HD webcam with microphone", price: 2199, image: "https://images.unsplash.com/photo-1629429407756-446d66f5b24e?w=500", category: categoryMap["Electronics"], stock: 12 },
        { name: "Power Bank", description: "20000mAh fast charging power bank", price: 1499, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500", category: categoryMap["Electronics"], stock: 35 },
        { name: "LED Monitor", description: "24-inch Full HD LED monitor", price: 8999, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500", category: categoryMap["Electronics"], stock: 8 },
        { name: "Wireless Earbuds", description: "True wireless earbuds with charging case", price: 1799, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500", category: categoryMap["Electronics"], stock: 28 },
        { name: "Smart Home Hub", description: "Voice-controlled smart home hub", price: 2999, image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500", category: categoryMap["Electronics"], stock: 14 },
        { name: "Portable SSD", description: "1TB portable SSD drive", price: 5999, image: "https://images.unsplash.com/photo-1597872200967-794a49ea9e76?w=500", category: categoryMap["Electronics"], stock: 10 },
        { name: "Gaming Mousepad", description: "Extended RGB mousepad", price: 499, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500", category: categoryMap["Electronics"], stock: 50 },
        { name: "Noise Cancelling Earbuds", description: "Premium noise cancelling earbuds", price: 3499, image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500", category: categoryMap["Electronics"], stock: 16 },
        { name: "Tablet Stand", description: "Adjustable tablet and phone stand", price: 699, image: "https://images.unsplash.com/photo-1585792180666-f7347f490ea2?w=500", category: categoryMap["Electronics"], stock: 25 },
        { name: "USB Microphone", description: "Professional USB microphone for streaming", price: 1899, image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500", category: categoryMap["Electronics"], stock: 11 },
        { name: "Smart Bulb", description: "WiFi enabled smart LED bulb", price: 499, image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=500", category: categoryMap["Electronics"], stock: 45 },
        { name: "Wireless Charger", description: "Fast wireless charging pad", price: 899, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500", category: categoryMap["Electronics"], stock: 30 },
        { name: "HDMI Cable", description: "4K HDMI cable 2 meters", price: 399, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500", category: categoryMap["Electronics"], stock: 60 },

        // Fashion
        { name: "Cotton T-Shirt", description: "Premium cotton t-shirt", price: 799, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", category: categoryMap["Fashion"], stock: 50 },
        { name: "Denim Jacket", description: "Classic denim jacket", price: 2499, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500", category: categoryMap["Fashion"], stock: 20 },
        { name: "Formal Shirt", description: "Slim fit formal shirt", price: 1299, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500", category: categoryMap["Fashion"], stock: 35 },
        { name: "Summer Dress", description: "Floral print summer dress", price: 1599, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500", category: categoryMap["Fashion"], stock: 18 },
        { name: "Wool Sweater", description: "Warm wool blend sweater", price: 1899, image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a01?w=500", category: categoryMap["Fashion"], stock: 22 },
        { name: "Cargo Pants", description: "Comfortable cargo pants", price: 1399, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500", category: categoryMap["Fashion"], stock: 28 },
        { name: "Silk Scarf", description: "Elegant silk scarf", price: 899, image: "https://images.unsplash.com/photo-1601924634867-3a6c5b77be1a?w=500", category: categoryMap["Fashion"], stock: 15 },
        { name: "Leather Belt", description: "Genuine leather belt", price: 699, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500", category: categoryMap["Fashion"], stock: 40 },
        { name: "Polo Shirt", description: "Classic fit polo shirt", price: 999, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500", category: categoryMap["Fashion"], stock: 33 },
        { name: "Winter Coat", description: "Insulated winter coat", price: 3999, image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500", category: categoryMap["Fashion"], stock: 10 },

        // Shoes
        { name: "Running Shoes", description: "Lightweight running shoes", price: 2299, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", category: categoryMap["Shoes"], stock: 25 },
        { name: "Casual Sneakers", description: "Everyday casual sneakers", price: 1799, image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500", category: categoryMap["Shoes"], stock: 30 },
        { name: "Leather Boots", description: "Premium leather boots", price: 3499, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500", category: categoryMap["Shoes"], stock: 15 },
        { name: "Sports Sandals", description: "Comfortable sports sandals", price: 999, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500", category: categoryMap["Shoes"], stock: 20 },
        { name: "Formal Shoes", description: "Classic formal leather shoes", price: 2799, image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500", category: categoryMap["Shoes"], stock: 18 },
        { name: "Canvas Shoes", description: "Trendy canvas shoes", price: 1299, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500", category: categoryMap["Shoes"], stock: 35 },
        { name: "Hiking Boots", description: "Durable hiking boots", price: 3299, image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500", category: categoryMap["Shoes"], stock: 12 },
        { name: "Slip-On Shoes", description: "Easy slip-on casual shoes", price: 1499, image: "https://images.unsplash.com/photo-1560769629-975e13f0c470?w=500", category: categoryMap["Shoes"], stock: 22 },
        { name: "Basketball Shoes", description: "High-top basketball shoes", price: 2999, image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500", category: categoryMap["Shoes"], stock: 14 },
        { name: "Flip Flops", description: "Comfortable summer flip flops", price: 499, image: "https://images.unsplash.com/photo-1603787503149-b8d3f34e6a02?w=500", category: categoryMap["Shoes"], stock: 45 },

        // Accessories
        { name: "Leather Watch", description: "Classic leather strap watch", price: 2999, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500", category: categoryMap["Accessories"], stock: 20 },
        { name: "Sunglasses", description: "Polarized sunglasses", price: 1499, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500", category: categoryMap["Accessories"], stock: 30 },
        { name: "Backpack", description: "Waterproof travel backpack", price: 1999, image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=500", category: categoryMap["Accessories"], stock: 25 },
        { name: "Wallet", description: "Slim bifold wallet", price: 899, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500", category: categoryMap["Accessories"], stock: 40 },
        { name: "Sunglasses Case", description: "Hard shell sunglasses case", price: 499, image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500", category: categoryMap["Accessories"], stock: 35 },
        { name: "Belt Bag", description: "Trendy belt bag", price: 1299, image: "https://images.unsplash.com/photo-1765519313320-22b0865e9c32?w=500", category: categoryMap["Accessories"], stock: 18 },
        { name: "Watch Band", description: "Metal watch band", price: 799, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500", category: categoryMap["Accessories"], stock: 28 },
        { name: "Laptop Sleeve", description: "Padded laptop sleeve 15 inch", price: 999, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500", category: categoryMap["Accessories"], stock: 22 },
        { name: "Phone Case", description: "Shockproof phone case", price: 499, image: "https://images.unsplash.com/photo-1601784551443-4dc2c6c2c58e?w=500", category: categoryMap["Accessories"], stock: 55 },
        { name: "Travel Pouch", description: "Compact travel pouch", price: 699, image: "https://images.unsplash.com/photo-1720430341267-12c806e4acbd?w=500", category: categoryMap["Accessories"], stock: 30 },

        // Home
        { name: "Table Lamp", description: "Modern LED table lamp", price: 1299, image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=500", category: categoryMap["Home"], stock: 20 },
        { name: "Wall Clock", description: "Minimalist wall clock", price: 899, image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500", category: categoryMap["Home"], stock: 25 },
        { name: "Cushion Cover", description: "Soft cushion cover set", price: 599, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500", category: categoryMap["Home"], stock: 40 },
        { name: "Plant Pot", description: "Ceramic plant pot", price: 799, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500", category: categoryMap["Home"], stock: 30 },
        { name: "Scented Candle", description: "Aromatic scented candle", price: 499, image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=500", category: categoryMap["Home"], stock: 35 },
        { name: "Wall Art", description: "Modern canvas wall art", price: 1599, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500", category: categoryMap["Home"], stock: 15 },
        { name: "Throw Blanket", description: "Soft fleece throw blanket", price: 1099, image: "https://images.unsplash.com/photo-1555041469-a586c61eaad5?w=500", category: categoryMap["Home"], stock: 22 },
        { name: "Coffee Mug", description: "Ceramic coffee mug set", price: 699, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500", category: categoryMap["Home"], stock: 45 },
        { name: "Shelf Organizer", description: "Wall-mounted shelf organizer", price: 1899, image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500", category: categoryMap["Home"], stock: 12 },
        { name: "Area Rug", description: "Soft area rug 5x7", price: 2499, image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=500", category: categoryMap["Home"], stock: 8 },

        // Beauty
        { name: "Face Moisturizer", description: "Hydrating face moisturizer", price: 699, image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=500", category: categoryMap["Beauty"], stock: 40 },
        { name: "Lipstick Set", description: "Matte lipstick collection", price: 899, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500", category: categoryMap["Beauty"], stock: 35 },
        { name: "Face Serum", description: "Vitamin C face serum", price: 1299, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500", category: categoryMap["Beauty"], stock: 28 },
        { name: "Hair Dryer", description: "Ionic hair dryer", price: 1899, image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=500", category: categoryMap["Beauty"], stock: 15 },
        { name: "Makeup Brush Set", description: "Professional makeup brushes", price: 1099, image: "https://images.unsplash.com/photo-1522335789203-aabd20f7893b?w=500", category: categoryMap["Beauty"], stock: 22 },
        { name: "Perfume", description: "Eau de parfum 100ml", price: 2499, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500", category: categoryMap["Beauty"], stock: 18 },
        { name: "Sunscreen", description: "SPF 50+ sunscreen", price: 599, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500", category: categoryMap["Beauty"], stock: 50 },
        { name: "Eye Cream", description: "Anti-aging eye cream", price: 999, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500", category: categoryMap["Beauty"], stock: 30 },
        { name: "Hair Oil", description: "Natural hair growth oil", price: 499, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500", category: categoryMap["Beauty"], stock: 40 },
        { name: "Nail Polish Set", description: "Gel nail polish collection", price: 799, image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500", category: categoryMap["Beauty"], stock: 25 },

        // Sports
        { name: "Yoga Mat", description: "Non-slip yoga mat", price: 999, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500", category: categoryMap["Sports"], stock: 30 },
        { name: "Dumbbells", description: "Pair of 5kg dumbbells", price: 1499, image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=500", category: categoryMap["Sports"], stock: 20 },
        { name: "Jump Rope", description: "Speed jump rope", price: 399, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500", category: categoryMap["Sports"], stock: 45 },
        { name: "Resistance Bands", description: "Set of 5 resistance bands", price: 599, image: "https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?w=500", category: categoryMap["Sports"], stock: 35 },
        { name: "Water Bottle", description: "Insulated steel water bottle", price: 799, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500", category: categoryMap["Sports"], stock: 40 },
        { name: "Gym Bag", description: "Spacious gym duffel bag", price: 1299, image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500", category: categoryMap["Sports"], stock: 25 },
        { name: "Sports Towel", description: "Quick-dry sports towel", price: 399, image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500", category: categoryMap["Sports"], stock: 50 },
        { name: "Cycling Gloves", description: "Padded cycling gloves", price: 699, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", category: categoryMap["Sports"], stock: 22 },
        { name: "Tennis Racket", description: "Lightweight tennis racket", price: 1899, image: "https://images.unsplash.com/photo-1622279457486-62dddcc43831?w=500", category: categoryMap["Sports"], stock: 12 },
        { name: "Foam Roller", description: "High-density foam roller", price: 899, image: "https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?w=500", category: categoryMap["Sports"], stock: 18 },

        // Grocery
        { name: "Organic Honey", description: "Pure organic honey 500g", price: 349, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500", category: categoryMap["Grocery"], stock: 60 },
        { name: "Almonds", description: "Premium almonds 1kg", price: 599, image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500", category: categoryMap["Grocery"], stock: 45 },
        { name: "Olive Oil", description: "Extra virgin olive oil 500ml", price: 499, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500", category: categoryMap["Grocery"], stock: 35 },
        { name: "Green Tea", description: "Organic green tea bags", price: 299, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500", category: categoryMap["Grocery"], stock: 50 },
        { name: "Pasta", description: "Whole wheat pasta 500g", price: 199, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500", category: categoryMap["Grocery"], stock: 55 },
        { name: "Dark Chocolate", description: "85% dark chocolate bar", price: 249, image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500", category: categoryMap["Grocery"], stock: 40 },
        { name: "Granola", description: "Healthy granola mix", price: 399, image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=500", category: categoryMap["Grocery"], stock: 30 },
        { name: "Coconut Oil", description: "Cold pressed coconut oil", price: 449, image: "https://images.unsplash.com/photo-1611077606886-a52c1cd48ef2?w=500", category: categoryMap["Grocery"], stock: 25 },
        { name: "Protein Powder", description: "Whey protein powder 1kg", price: 1299, image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500", category: categoryMap["Grocery"], stock: 20 },
        { name: "Quinoa", description: "Organic quinoa 500g", price: 349, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500", category: categoryMap["Grocery"], stock: 35 },

        // Books
        { name: "Fiction Novel", description: "Bestselling fiction novel", price: 399, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500", category: categoryMap["Books"], stock: 40 },
        { name: "Cookbook", description: "Easy home cooking recipes", price: 599, image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500", category: categoryMap["Books"], stock: 25 },
        { name: "Self-Help Guide", description: "Personal development guide", price: 349, image: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=500", category: categoryMap["Books"], stock: 30 },
        { name: "Science Fiction", description: "Classic sci-fi collection", price: 499, image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500", category: categoryMap["Books"], stock: 20 },
        { name: "Children's Book", description: "Illustrated children's storybook", price: 299, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500", category: categoryMap["Books"], stock: 35 },
        { name: "Travel Guide", description: "Comprehensive travel guide", price: 449, image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500", category: categoryMap["Books"], stock: 22 },
        { name: "Biography", description: "Inspiring biography", price: 399, image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500", category: categoryMap["Books"], stock: 18 },
        { name: "Notebook", description: "Hardcover ruled notebook", price: 199, image: "https://images.unsplash.com/photo-1531346878377-a5be20888e43?w=500", category: categoryMap["Books"], stock: 60 },
        { name: "Journal", description: "Leather bound journal", price: 599, image: "https://images.unsplash.com/photo-1677064061401-f77f966ff8a1?w=500", category: categoryMap["Books"], stock: 28 },
        { name: "Coloring Book", description: "Stress relief coloring book", price: 249, image: "https://images.unsplash.com/photo-1602015714572-38d21ee6c9e6?w=500", category: categoryMap["Books"], stock: 40 },

        // Gaming
        { name: "Gaming Controller", description: "Wireless gaming controller", price: 1999, image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=500", category: categoryMap["Gaming"], stock: 20 },
        { name: "Gaming Keyboard", description: "Mechanical gaming keyboard", price: 2999, image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=500", category: categoryMap["Gaming"], stock: 15 },
        { name: "Gaming Mouse", description: "High precision gaming mouse", price: 1499, image: "https://images.unsplash.com/photo-1615680022647-99c397cbcaea?w=500", category: categoryMap["Gaming"], stock: 25 },
        { name: "Gaming Headset", description: "Surround sound gaming headset", price: 2499, image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500", category: categoryMap["Gaming"], stock: 18 },
        { name: "Gamepad", description: "Ergonomic gamepad", price: 1299, image: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=500", category: categoryMap["Gaming"], stock: 22 },
        { name: "Gaming Chair", description: "Ergonomic gaming chair", price: 5999, image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500", category: categoryMap["Gaming"], stock: 8 },
        { name: "Mousepad XL", description: "Extended gaming mousepad", price: 699, image: "https://images.unsplash.com/photo-1616071356032-8ba91e7f3d47?w=500", category: categoryMap["Gaming"], stock: 35 },
        { name: "Streaming Mic", description: "USB streaming microphone", price: 1799, image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500", category: categoryMap["Gaming"], stock: 14 },
        { name: "Gaming Desk", description: "RGB gaming desk", price: 8999, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500", category: categoryMap["Gaming"], stock: 6 },
        { name: "Game CD", description: "Popular game CD", price: 999, image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=500", category: categoryMap["Gaming"], stock: 30 }
    ];

    for (const product of products) {
        if (!product.category) continue;
        await Product.findOneAndUpdate(
            { name: product.name },
            { $set: product },
            { upsert: true, setDefaultsOnInsert: true, returnDocument: "after" }
        );
        console.log(`Upserted product: ${product.name}`);
    }

    console.log("Product seeding completed.");
};

module.exports = seedProducts;