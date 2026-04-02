import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CartPage(){
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function getCartID() {
        let id = localStorage.getItem("gunner_cart_id");
        if (!id) {
            id = Math.floor(Math.random() * 1000000);
            localStorage.setItem("gunner_cart_id", id);
        }
        return id;
    };

    useEffect(()=>{
        document.title = 'GUNNER! - Cart';

        fetchCart();
    }, []);

    async function fetchCart() {
        const cartID = getCartID();
        try {
            setLoading(true);
            const response = await axios.get(`/api/cart/${cartID}`);
            setCartItems(response.data);
            setLoading(false);
        }
        catch (err) {
            console.error("Failed to fetch cart:", err);
            setError("COULD NOT RETRIEVE ARMORY DATA.");
            setLoading(false);
        }
    };

    const updateQuantity = async (productSlug, change, currentQty) => {
        if (currentQty + change < 1) return;

        const cartID = getCartID();
        try {
            await axios.post('/api/cart/add', {
                cartID: cartID,
                productSlug: productSlug,
                quantity: change
            });
            fetchCart();
        } catch (err) {
            console.error("Tactical update failed:", err);
        }
    };

    function calculateTotal() {
        return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
    };

    return(
        <div className="container-fluid my-1 p-5 bg-dark border-top border-bottom border-2 border-danger">
            <h1 className="text-danger text-center">Cart</h1>
            <hr className="border border-3 border-danger w-50 rounded mx-auto" />

            <div id="cart_items" className="container">
                {loading ? (
                    <p className="text-center text-secondary">SCANNING INVENTORY...</p>
                    ) : cartItems.length === 0 ? (
                        <div className="text-center py-5">
                            <p className="fs-3 text-secondary">NO GEAR DETECTED IN YOUR LOADOUT.</p>
                            <Link to="/" className="btn btn-outline-danger mt-3">REQUISITION WEAPONS</Link>
                        </div>
                    ) : (
                    <div className="table-responsive">
                        <table className="table table-dark align-middle border-secondary">
                            <thead>
                                <tr className="text-danger small">
                                    <th>EQUIPMENT</th>
                                    <th className="text-center">QUANTITY</th>
                                    <th className="text-end">UNIT</th>
                                    <th className="text-end">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={index} className="border-bottom border-secondary">
                                        <td>
                                            <Link to={`/Guns/${item.slug}`} className="text-white text-decoration-none fw-bold d-block">
                                                {item.name.toUpperCase()}
                                            </Link>
                                            <span className="text-secondary small">SLUG: {item.slug}</span>
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <button className="btn btn-sm btn-outline-danger px-2 py-0"onClick={() => updateQuantity(item.slug, -1, item.quantity)}>-</button>
                                                <span className="fw-bold px-2">{item.quantity}</span>
                                                <button className="btn btn-sm btn-outline-danger px-2 py-0"onClick={() => updateQuantity(item.slug, 1, item.quantity)}>+</button>
                                            </div>
                                        </td>
                                        <td className="text-end text-secondary">${item.price}</td>
                                        <td className="text-end text-danger fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                    </div>
                )}
            </div>

            <div className="row gap-3 justify-content-center border-top border-bottom border-danger py-4 mt-5">
                <h3 className="text-secondary">TOTAL REQUISITION FUNDS: <span className="text-danger">${calculateTotal()}</span></h3>

                <hr />
                <Link to={'/Tracking'} className="btn btn-danger col-md-3">Track Order</Link>
                <p className="text-secondary col-md-5 text-center d-none d-lg-block">-- GUNNER! --</p>
                <Link to={'/Checkout'} className="btn btn-danger col-md-3">Checkout</Link>
            </div>
        </div>
    )
}

export default CartPage;
