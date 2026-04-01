import { useState, useEffect } from "react";
import axios from "axios";

function TrackingPage() {
    const [search, setSearch] = useState({ orderNumber: "", email: "" });
    const [orderData, setOrderData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = 'GUNNER! - Track Order';
    }, []);

    const handleTrack = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setOrderData(null);

        try {
            const response = await axios.get(`/track-order`, { params: search });
            if (response.data.success) {
                setOrderData(response.data.order);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Communication failure.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid my-1 p-5 bg-dark border-top border-bottom border-2 border-danger text-light min-vh-100">
            <h1 className="text-danger text-center display-4 fw-bold">ORDER TRACKING</h1>
            <hr className="border border-3 border-danger w-25 rounded mx-auto mb-5" />

            <div className="row justify-content-center">
                <div className="col-md-6">

                    <form onSubmit={handleTrack} className="p-4 border border-secondary rounded bg-dark mb-5">
                        <h3 className="text-danger h5 mb-3">- ENTER TRANSMISSION DETAILS</h3>
                        <div className="mb-3">
                            <label className="text-danger small fw-bold">ORDER NUMBER (GNR-XXXXXX)</label>
                            <input type="text" className="form-control bg-dark text-white border-secondary" placeholder="GNR-123456"onChange={(e) => setSearch({...search, orderNumber: e.target.value})}required />
                        </div>
                        <div className="mb-3">
                            <label className="text-danger small fw-bold">OPERATIVE EMAIL</label>
                            <input type="email" className="form-control bg-dark text-white border-secondary" placeholder="name@example.com"onChange={(e) => setSearch({...search, email: e.target.value})}required />
                        </div>
                        <button type="submit" className="btn btn-danger w-100 fw-bold" disabled={loading}>
                            {loading ? "SEARCHING ARCHIVES..." : "LOCATE PACKAGE"}
                        </button>
                    </form>

                    {error && <div className="alert alert-danger bg-dark border-danger text-danger text-center">{error}</div>}

                    {orderData && (
                        <div className="p-4 border border-danger rounded bg-dark shadow-lg animate-in">
                            <h2 className="text-danger h4 mb-4">- ORDER DOSSIER</h2>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <span className="text-secondary small d-block">STATUS</span>
                                    <span className="badge bg-danger text-dark fw-bold px-3 py-2">
                                        {orderData.status.toUpperCase()}
                                    </span>
                                </div>
                                <div className="col-6 mb-3">
                                    <span className="text-secondary small d-block">ORDER NUMBER</span>
                                    <span className="fw-bold text-white">{orderData.order_number}</span>
                                </div>
                                <div className="col-6 mb-3">
                                    <span className="text-secondary small d-block">OPERATIVE</span>
                                    <span className="text-white">{orderData.full_name}</span>
                                </div>
                                <div className="col-6 mb-3">
                                    <span className="text-secondary small d-block">DEPLOYED ON</span>
                                    <span className="text-white">{new Date(orderData.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <hr className="border-secondary" />
                            <p className="text-center text-secondary small italic">
                                Thank you for choosing GUNNER!. Stand by for further intel.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TrackingPage;