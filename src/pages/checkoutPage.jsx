import axios from "axios";
import { useEffect, useState } from "react";

function CheckoutPage(){
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    
    const [formData, setFormData] = useState({
        email: "",
        fullName: "",
        address: "",
        city: "",
        zip: "",
        paymentMethod: "credit_card"
    });

    function getCartID() {
        return localStorage.getItem("gunner_cart_id");
    };

    useEffect(()=>{
        document.title = 'GUNNER! - Checkout';

        fetchLiveCart()
    }), [];

    async function fetchLiveCart() {
        const cartID = getCartID();
        if (!cartID) return;

        try {
        const response = await axios.get(`/cart/${cartID}`);
        setCartItems(response.data);
        
        const total = response.data.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotalPrice(total);
        } catch (err) {
        console.error("Failed to sync armory data:", err);
        }
    };

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function nextStep(e) {
        e.preventDefault();
        setStep(step + 1);
    };

    function prevStep() {
        setStep(step - 1);
    };

    async function handleAuthorizeDispatch(e) {
        e.preventDefault();
        setIsProcessing(true);

        const payload = {
            ...formData,
            cartItems: cartItems,
            total: totalPrice
        };

        try {
            const response = await axios.post('/dispatch-order', payload);

            if (response.data.success) {
                setOrderId(response.data.orderNumber);
                setStep(4);
            }
        }
        catch(err) {
            const errorMsg = err.response?.data?.message || "Communication blackout.";
            alert(`CRITICAL FAILURE: ${errorMsg}`);
        } finally {
            setIsProcessing(false);
        }
  };

    return(
        <div className="container-fluid my-1 p-5 bg-dark border-top border-bottom border-2 border-danger">
            <h1 className="text-danger text-center">Checkout</h1>
            <hr className="border border-3 border-danger w-50 rounded mx-auto" />

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        
                        {step < 4 && (
                        <div className="d-flex justify-content-between mb-5 text-secondary fw-bold small">
                            <span className={step >= 1 ? "text-danger" : ""}>1. TARGET INTEL</span>
                            <span>-</span>
                            <span className={step >= 2 ? "text-danger" : ""}>2. MUNITIONS FUNDING</span>
                            <span>-</span>
                            <span className={step >= 3 ? "text-danger" : ""}>3. DEPLOYMENT</span>
                        </div>
                        )}

                        {step === 1 && (
                        <form onSubmit={nextStep} className="p-4 border border-1 border-secondary rounded bg-dark shadow-lg">
                            <h3 className="text-danger mb-4">- EXTRACTION POINT</h3>
                            <div className="mb-3">
                                <label className="form-label text-danger small fw-bold">EMAIL ADDRESS</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control bg-dark text-white border-secondary" placeholder="example@gmail.com" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-danger small fw-bold">FULL NAME / CALLSIGN</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-control bg-dark text-white border-secondary" placeholder="John White." required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-danger small fw-bold">SHIPPING ADDRESS</label>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-control bg-dark text-white border-secondary" placeholder="Cairo, 6th of october" required />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-danger small fw-bold">CITY</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-control bg-dark text-white border-secondary" placeholder="Cairo" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-danger small fw-bold">ZIP CODE</label>
                                    <input type="text" name="zip" value={formData.zip} onChange={handleChange} className="form-control bg-dark text-white border-secondary" placeholder="0000000" required />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-danger rounded-0 w-100 mt-4 fw-bold">PROCEED TO FUNDING &raquo;</button>
                        </form>
                        )}

                        {step === 2 && (
                        <form onSubmit={nextStep} className="p-4 border border-1 border-secondary rounded bg-dark shadow-lg">
                            <h3 className="text-danger mb-4">- MUNITIONS FUNDING</h3>
                            
                            <div className="form-check mb-3">
                                <input className="form-check-input bg-dark border-danger" type="radio" id="credit" name="paymentMethod" value="credit_card" checked={formData.paymentMethod === "credit_card"} onChange={handleChange} />
                                <label className="form-check-label text-light fw-bold" for="credit">Secure Credit Line (Mock)</label>
                            </div>
                                <div className="form-check mb-4">
                                <input className="form-check-input bg-dark border-danger" type="radio" id="cash" name="paymentMethod" value="cod" checked={formData.paymentMethod === "cod"} onChange={handleChange} />
                                <label className="form-check-label text-light fw-bold"  for="cash">Cash on Delivery (COD)</label>
                            </div>

                            {formData.paymentMethod === "credit_card" && (
                            <div className="p-3 border border-secondary rounded mb-4">
                                <div className="mb-3">
                                    <label className="form-label text-danger small fw-bold">CARD NUMBER</label>
                                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} className="form-control bg-dark text-white border-secondary" placeholder="0000 0000 0000 0000" maxLength="16" required={formData.paymentMethod === "credit_card"} />
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <label className="form-label text-danger small fw-bold">EXPIRY (MM/YY)</label>
                                        <input type="text" name="expiry" value={formData.expiry} onChange={handleChange} className="form-control bg-dark text-white border-secondary" placeholder="12/25" required={formData.paymentMethod === "credit_card"} />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label text-danger small fw-bold">CVV</label>
                                        <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} className="form-control bg-dark text-white border-secondary" placeholder="123" maxLength="4" required={formData.paymentMethod === "credit_card"} />
                                    </div>
                                </div>
                            </div>
                            )}

                            <div className="d-flex justify-content-between mt-4">
                                <button type="button" onClick={prevStep} className="btn btn-outline-secondary fw-bold rounded-0">&laquo; BACK</button>
                                <button type="submit" className="btn btn-danger fw-bold rounded-0">REVIEW DOSSIER &raquo;</button>
                            </div>
                        </form>
                        )}

                        {step === 3 && (
                            <div className="p-4 border border-1 border-secondary rounded bg-dark shadow-lg">
                                <h3 className="text-danger mb-4">- FINAL MISSION REVIEW</h3>

                                <div className="mb-4 p-3 border-start border-danger bg-dark">
                                    <p className="text-danger small fw-bold mb-2">REQUISITION LIST:</p>
                                    {cartItems.map((item, idx) => (
                                        <div key={idx} className="d-flex justify-content-between small text-secondary">
                                            <span>{item.name} x{item.quantity}</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                    <hr className="border-secondary" />
                                    <div className="d-flex justify-content-between fw-bold text-white">
                                        <span>TOTAL FUNDS</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="mb-4 text-secondary">
                                    <p><strong>OPERATIVE:</strong> {formData.fullName}</p>
                                    <p><strong>DESTINATION:</strong> {formData.city}, {formData.zip}</p>
                                    <p><strong>FUNDS REQUIRED:</strong> ${totalPrice.toFixed(2)}</p>
                                </div>

                                <div className="alert alert-danger bg-dark border-danger text-light mb-4">
                                    <small><strong>WARNING:</strong> By confirming, you authorize GUNNER! to dispatch these replicas to your location. An electronic receipt will be sent to your terminal.</small>
                                </div>
                                
                                <button onClick={handleAuthorizeDispatch} disabled={isProcessing || cartItems.length === 0} className="btn btn-danger w-100 fw-bold py-3 rounded-0 shadow-sm">
                                {isProcessing ? "TRANSMITTING ENCRYPTED DATA..." : "AUTHORIZE DISPATCH"}
                                </button>
                                
                                <button onClick={() => setStep(2)} disabled={isProcessing} className="btn btn-link text-secondary w-100 mt-2 rounded-0 text-decoration-none sm">
                                &laquo; Abort and Re-evaluate
                                </button>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="text-center p-5 border border-2 border-danger rounded bg-dark">
                                <i className="bi bi-shield-check text-danger display-1"></i>
                                <h2 className="text-danger fw-bold mt-3">ORDER DEPLOYED</h2>
                                <p className="text-light">Transmission ID: <span className="text-white fw-mono">{orderId}</span></p>
                                <p className="text-secondary small">Stand by for email confirmation at {formData.email}.</p>
                                <button onClick={() => window.location.href = '/'} className="btn btn-outline-danger rounded-0 mt-4 px-5">RETURN TO BASE</button>
                            </div>
                        )}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default CheckoutPage;