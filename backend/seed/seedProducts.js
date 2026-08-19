const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");
require("dotenv").config();

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB...");

        // PAZHAYA DATA-VA CLEAN PANRA LOGIC IDHU THAAN 👇
        await Product.deleteMany({});
        console.log("🧹 Old test products cleared successfully!");

        const categories = await Category.find();
        const categoryMap = {};
        categories.forEach((cat) => {
            categoryMap[cat.name] = cat._id;
        });

        // 10 Categories x 5 Base Products = 50 Base Items
        const baseProducts = [
            // Electronics
           // Electronics
            { cat: "Electronics", name: "Wireless Headphones", keyword: "headphones", price: 1999, desc: "Bluetooth headphones with active noise cancellation" },
            { cat: "Electronics", name: "Smart Desk Clock", keyword: "deskclock", price: 2499, desc: "Digital smart desk clock with LED display and ambient light" },
            { cat: "Electronics", name: "Mechanical Keyboard", keyword: "keyboard", price: 3499, desc: "RGB mechanical keyboard for high-speed typing" },
            { cat: "Electronics", name: "Gaming Mouse", keyword: "computer,mouse", price: 1499, desc: "Ergonomic high-precision optical mouse" },
            { cat: "Electronics", name: "4K Monitor", keyword: "monitor", price: 12999, desc: "Ultra HD LED display for crisp visuals" },

            // Fashion
            { cat: "Fashion", name: "Cotton T-Shirt", keyword: "tshirt", price: 799, desc: "Premium breathable cotton casual t-shirt" },
            { cat: "Fashion", name: "Denim Jacket", keyword: "jacket", price: 2499, desc: "Classic blue denim jacket with sturdy buttons" },
            { cat: "Fashion", name: "Formal Shirt", keyword: "shirt", price: 1299, desc: "Slim fit formal shirt for office wear" },
            { cat: "Fashion", name: "Cargo Pants", keyword: "pants", price: 1599, desc: "Comfortable multi-pocket cargo trousers" },
            { cat: "Fashion", name: "Wool Sweater", keyword: "sweater", price: 1899, desc: "Warm winter wool blend sweater" },

            // Shoes
            { cat: "Shoes", name: "Running Shoes", keyword: "runningshoes", price: 2299, desc: "Lightweight breathable shoes for jogging" },
            { cat: "Shoes", name: "Casual Sneakers", keyword: "sneakers", price: 1799, desc: "Everyday street-style comfortable sneakers" },
            { cat: "Shoes", name: "Leather Boots", keyword: "boots", price: 3499, desc: "Tough and durable premium leather boots" },
            { cat: "Shoes", name: "Formal Shoes", keyword: "formalshoes", price: 2799, desc: "Classic Oxford style formal leather shoes" },
            { cat: "Shoes", name: "Sports Sandals", keyword: "sandals", price: 999, desc: "Water-resistant outdoor sports sandals" },

            // Accessories
            { cat: "Accessories", name: "Leather Wallet", keyword: "wallet", price: 899, desc: "Slim bifold genuine leather wallet" },
            { cat: "Accessories", name: "Sunglasses", keyword: "sunglasses", price: 1499, desc: "UV protection polarized sunglasses" },
            { cat: "Accessories", name: "Travel Backpack", keyword: "backpack", price: 1999, desc: "Waterproof multi-compartment travel bag" },
            { cat: "Accessories", name: "Watch Band", keyword: "watchband", price: 499, desc: "Adjustable metallic strap for smartwatches" },
            { cat: "Accessories", name: "Laptop Sleeve", keyword: "laptopsleeve", price: 799, desc: "Padded protective cover for 15-inch laptops" },

            // Home 
            { cat: "Home", name: "LED Table Lamp", keyword: "lamp", price: 1299, desc: "Modern desk lamp with adjustable brightness" },
            { cat: "Home", name: "Wall Clock", keyword: "wallclock", price: 899, desc: "Minimalist silent sweeping quartz wall clock" },
            { cat: "Home", name: "Ceramic Plant Pot", keyword: "plantpot", price: 599, desc: "Decorative ceramic pot for indoor plants" },
            { cat: "Home", name: "Scented Candle", keyword: "candle", price: 399, desc: "Aromatic lavender infused relaxing candle" },
            { cat: "Home", name: "Coffee Mug Set", keyword: "coffeemug", price: 699, desc: "Set of 2 aesthetic ceramic coffee mugs" },

            // Beauty
            { cat: "Beauty", name: "Face Moisturizer", keyword: "moisturizer", price: 699, desc: "Hydrating day cream for glowing skin" },
            { cat: "Beauty", name: "Matte Lipstick", keyword: "lipstick", price: 499, desc: "Long-lasting smudge-proof matte lip color" },
            { cat: "Beauty", name: "Vitamin C Serum", keyword: "serum", price: 899, desc: "Skin brightening and anti-aging face serum" },
            { cat: "Beauty", name: "Hair Dryer", keyword: "hairdryer", price: 1899, desc: "Fast-drying ionic technology hair blower" },
            { cat: "Beauty", name: "Perfume", keyword: "perfume", price: 2499, desc: "Long-lasting premium eau de parfum" },

            // Sports
            { cat: "Sports", name: "Yoga Mat", keyword: "yogamat", price: 999, desc: "Non-slip high-density exercise mat" },
            { cat: "Sports", name: "Dumbbell Set", keyword: "dumbbells", price: 1499, desc: "Pair of 5kg vinyl coated hex dumbbells" },
            { cat: "Sports", name: "Jump Rope", keyword: "jumprope", price: 299, desc: "Adjustable high-speed skipping rope" },
            { cat: "Sports", name: "Resistance Bands", keyword: "resistancebands", price: 499, desc: "Set of 5 varying resistance workout bands" },
            { cat: "Sports", name: "Gym Bag", keyword: "gymbag", price: 1199, desc: "Spacious duffel bag with shoe compartment" },

            // Grocery
            { cat: "Grocery", name: "Organic Honey", keyword: "honey", price: 349, desc: "100% pure natural raw honey 500g" },
            { cat: "Grocery", name: "Premium Almonds", keyword: "almonds", price: 599, desc: "Crunchy and healthy California almonds 500g" },
            { cat: "Grocery", name: "Olive Oil", keyword: "oliveoil", price: 499, desc: "Extra virgin cold-pressed olive oil 500ml" },
            { cat: "Grocery", name: "Green Tea", keyword: "greentea", price: 299, desc: "Organic detox green tea leaves 250g" },
            { cat: "Grocery", name: "Dark Chocolate", keyword: "chocolate", price: 199, desc: "Rich 85% cocoa dark chocolate bar" },

            // Books
            { cat: "Books", name: "Fiction Novel", keyword: "fictionbook", price: 399, desc: "Award-winning bestselling mystery novel" },
            { cat: "Books", name: "Cookbook", keyword: "cookbook", price: 499, desc: "100+ easy homemade healthy recipes" },
            { cat: "Books", name: "Self-Help Guide", keyword: "selfhelpbook", price: 299, desc: "Actionable tips for personal development" },
            { cat: "Books", name: "Ruled Notebook", keyword: "notebook", price: 150, desc: "Hardcover premium 200-page notebook" },
            { cat: "Books", name: "Travel Guide", keyword: "travelbook", price: 349, desc: "Comprehensive guide for world travelers" },

            // Gaming
            { cat: "Gaming", name: "Wireless Controller", keyword: "gamecontroller", price: 2499, desc: "Bluetooth gamepad with dual vibration" },
            { cat: "Gaming", name: "Gaming Headset", keyword: "gamingheadset", price: 1999, desc: "7.1 surround sound headphones with mic" },
            { cat: "Gaming", name: "RGB Deskpad", keyword: "mousepad", price: 899, desc: "Extra large glowing mousepad for gamers" },
            { cat: "Gaming", name: "Streaming Mic", keyword: "microphone", price: 2999, desc: "Professional USB condenser microphone" },
            { cat: "Gaming", name: "Gaming Chair", keyword: "gamingchair", price: 8999, desc: "Ergonomic chair with lumbar support" }
        ];

        const productsToInsert = [];
        let imageLockId = 1; 

        const productVariants = [
            { suffix: "", priceMult: 1, descAdd: "" }, 
            { suffix: " Pro", priceMult: 1.5, descAdd: " - Professional Edition with premium build quality." },
            { suffix: " Lite", priceMult: 0.7, descAdd: " - Lightweight essential edition for everyday use." },
            { suffix: " Ultra", priceMult: 2.2, descAdd: " - Ultimate flagship model for top-tier performance." }
        ];

        for (const base of baseProducts) {
            if (!categoryMap[base.cat]) continue; 

            for (const variant of productVariants) {
                const finalName = base.name + variant.suffix;
                const finalPrice = Math.round(base.price * variant.priceMult);
                const finalDesc = base.desc + variant.descAdd;
                
                const finalImage = `https://loremflickr.com/500/500/${base.keyword}?lock=${imageLockId}`;

                productsToInsert.push({
                    name: finalName,
                    description: finalDesc,
                    price: finalPrice,
                    image: finalImage,
                    category: categoryMap[base.cat],
                    stock: Math.floor(Math.random() * 50) + 10
                });

                imageLockId++;
            }
        }

        console.log(`Prepared ${productsToInsert.length} unique products for seeding...`);

        const bulkOps = productsToInsert.map(product => ({
            updateOne: {
                filter: { name: product.name },
                update: { $set: product },
                upsert: true
            }
        }));

        await Product.bulkWrite(bulkOps);
        
        console.log("✅ All 200 Products seeded successfully with unique images!");

    } catch (error) {
        console.error("Seeding Error: ", error);
    }
};

module.exports = seedProducts;