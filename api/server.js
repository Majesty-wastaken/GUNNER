import 'dotenv/config';
import process from 'node:process';
import express from 'express';
import conn from './config.js';
import cors from 'cors';

const appNA = express();
const app = express.Router();

const corsOptions = {
    origin: ["http://localhost:5173"]
}
appNA.use(cors(corsOptions));

appNA.use(express.json());

app.get('/guns', (req, res) => {
    conn.query('SELECT * FROM products', (err, results) => {
        if(err){
            return res.status(500).json({Error: 'Database error.'});
        }
        res.json(results);
    });
});

app.get('/guns/categories', (req, res) => {
    conn.query('SELECT DISTINCT category FROM products', (err, results) => {
        if(err){
            return res.status(500).json({Error: 'Database error.'});
        }
        res.json(results);
    });
});

app.get('/guns/ammos', (req, res) => {
    conn.query('SELECT DISTINCT ammo FROM products', (err, results) => {
        if(err){
            return res.status(500).json({Error: 'Database error.'});
        }
        res.json(results);
    });
});

app.get('/guns/price-desc', (req, res) => {
    conn.query('SELECT * FROM products ORDER BY price DESC', (err, results) => {
        if(err){
            return res.status(500).json({Error: `Database error: ${err}`});
        }
        res.json(results);
    });
});

app.get('/guns/price-asc', (req, res) => {
    conn.query('SELECT * FROM products ORDER BY price ASC', (err, results) => {
        if(err){
            return res.status(500).json({Error: `Database error: ${err}`});
        }
        res.json(results);
    });
});



app.post('/dispatch-order', (req, res) => {
    const { email, fullName, address, city, zip, paymentMethod, cartItems, total } = req.body;
    const orderNumber = `GNR-${Math.floor(100000 + Math.random() * 900000)}`;

    conn.execute(
        `INSERT INTO orders (order_number, email, full_name, address, city, zip_code, payment_method, total_price) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [orderNumber, email, fullName, address, city, zip, paymentMethod, total], 
        (err, results) => {
            if (err) {
                console.error("Order Creation Failed:", err);
                return res.status(500).json({ success: false, message: "Database error during order creation." });
            }

            const orderId = results.insertId;

            if (!cartItems || cartItems.length === 0) {
                return res.status(200).json({ success: true, orderNumber });
            }

            let itemsProcessed = 0;
            let errorOccurred = false;

            cartItems.forEach((item) => {
                conn.execute(
                    `INSERT INTO order_items (order_id, product_slug, quantity, price_at_purchase) VALUES (?, ?, ?, ?)`,
                    [orderId, item.slug, item.quantity, item.price], 
                    (itemErr) => {
                        if (itemErr && !errorOccurred) {
                            errorOccurred = true;
                            console.error("Item Insertion Failed:", itemErr);
                            return res.status(500).json({ success: false, message: "Munitions logging failed." });
                        }

                        itemsProcessed++;

                        if (itemsProcessed === cartItems.length && !errorOccurred) {
                            console.log(`[TRANSMISSION SENT] To: ${email} | Order ${orderNumber}`);
                            return res.status(200).json({ 
                                success: true, 
                                message: "Mission Accomplished. Order Dispatched.",
                                orderNumber 
                            });
                        }
                    }
                );
            });
        }
    );
});

app.get('/track-order', (req, res) => {
    const { orderNumber, email } = req.query;

    if (!orderNumber || !email) {
        return res.status(400).json({ success: false, message: "Missing Intel: Order Number and Email required." });
    }

    conn.execute(`SELECT order_number, full_name, status, total_price, created_at 
        FROM orders 
        WHERE order_number = ? AND email = ?`, [orderNumber, email], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "System Breach: Database error." });
        }

        if (results.length > 0) {
            res.json({ success: true, order: results[0] });
        } else {
            res.status(404).json({ success: false, message: "No match found. Check your credentials." });
        }
    });
});



app.get('/guns/:slug', (req, res) => {
    const slug = req.params.slug.trim();
    conn.query('SELECT * FROM products WHERE slug = ?', slug, (err, results) => {
        if(err){
            return res.status(500).json({Error: 'Database error.'});
        }
        res.json(results);
    });
});

app.get('/guns/category/:category', (req, res) => {
    const category = req.params.category.trim();
    conn.query('SELECT * FROM products WHERE category = ?', category, (err, results) => {
        if(err){
            return res.status(500).json({Error: 'Database error.'});
        }
        res.json(results);
    });
});

app.get('/guns/ammo/:ammo', (req, res) => {
    const ammo = req.params.ammo.trim();
    conn.query('SELECT * FROM products WHERE ammo = ?', ammo, (err, results) => {
        if(err){
            return res.status(500).json({Error: 'Database error.'});
        }
        res.json(results);
    });
});


app.get('/favorite', (req, res) => {
    conn.query("SELECT * FROM products WHERE favorited = 'true' ", (err, results) => {
        if(err){
            return res.status(500).json({Error: 'Database error.'});
        }
        res.json(results);
    });
});

app.get('/favorited-status/:slug', (req, res) => {
    const slug = req.params.slug.trim();

    conn.query("SELECT favorited FROM products WHERE slug = ?", slug, (err, results) => {
        if(err){
            return res.status(500).json({Error: 'Database error.'});
        }

        if(results.length === 0) {
            return res.status(404).json({ Message: "Gun not found" });
        }

        const status = results[0].favorited;

        res.json({ favorited: status });
    });
})

app.patch('/favorited/:slug', (req, res) => {
    const slug = req.params.slug.trim();

    conn.query("SELECT favorited FROM products WHERE slug = ?", slug, (err, results) => {
        if(err){
            return res.status(500).json({Error: 'Database error.'});
        }

        if(results.length === 0) {
            return res.status(404).json({ Message: "Gun not found" });
        }

        const currentStatus = results[0].favorited;
        const newStatus = currentStatus === "true" ? "false" : "true";
        
        conn.query("UPDATE products SET favorited = ? WHERE slug = ?", [newStatus, slug], (err, results) => {
            if(err){
                return res.status(500).json({Error: 'Database error.'});
            }
            res.json({ slug, favorited: newStatus });
        });
    });
})



app.post('/cart/add', (req, res) => {
    const { cartID, productSlug, quantity } = req.body;

    conn.query('INSERT IGNORE INTO cart (cartid) VALUES (?)', [cartID], (err) => {
        if (err) return res.status(500).json({ Error: 'Database error creating cart.' });

        conn.query('SELECT * FROM cart_items WHERE cartid = ? AND productslug = ?', [cartID, productSlug], (err, results) => {
            if (err) return res.status(500).json({ Error: 'Database error checking items.' });

            if (results.length > 0) {
                conn.query(
                    'UPDATE cart_items SET quantity = quantity + ? WHERE cartid = ? AND productslug = ?',
                    [quantity, cartID, productSlug],
                    (err) => {
                        if (err) return res.status(500).json({ Error: 'Update failed.' });
                        return res.status(200).json({ message: 'Quantity updated!' });
                    }
                );
            } else {
                conn.query(
                    'INSERT INTO cart_items (cartid, productslug, quantity) VALUES (?, ?, ?)',
                    [cartID, productSlug, quantity],
                    (err) => {
                        if (err) return res.status(500).json({ Error: 'Insert failed.' });
                        return res.status(200).json({ message: 'Item added to cart!' });
                    }
                );
            }
        });
    });
});

app.get('/cart/:cartID', (req, res) => {
    const cartID = req.params.cartID.trim();

    conn.query('SELECT ci.quantity, p.slug, p.name, p.price FROM cart_items ci JOIN products p ON ci.productSlug = p.slug WHERE ci.cartid = ?', [cartID], (err, results) => {
        if(err){
            return res.status(500).json({Error: 'Failed to Fetch Cart'});
        }

        res.status(200).json(results);
    });
})

app.use('/api', appNA);

export default app;


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
