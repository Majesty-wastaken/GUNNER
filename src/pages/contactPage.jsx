import { useEffect } from "react";

function ContactPage(){

    useEffect(()=>{
        document.title = 'GUNNER! - Contact us';
    });

    return(
        <div className="container-fluid my-1 p-5 bg-dark border-top border-bottom border-2 border-danger">
            <h1 className="text-danger text-center">Contact us</h1>
            <hr className="border border-3 border-danger w-50 rounded mx-auto" />

            <div className="container">
                <div className="row g-5">
                    <div className="col-md-5">
                        <h2 className="text-danger h3 mb-4">- DIRECT INTEL</h2>
                        <p className="text-light">Have questions regarding specifications, bulk orders, or legal compliance? Reach out to our tactical support team.</p>
                        
                        <div className="mt-4">
                            <h5 className="text-danger">EMAIL</h5>
                            <p className="text-light">support@gunner-blanks.com</p>
                        </div>

                        <div className="mt-4">
                            <h5 className="text-danger">PHONE</h5>
                            <p className="text-light">+1 (555) 010-9988</p>
                        </div>

                        <div className="mt-4">
                            <h5 className="text-danger">HQ HOURS</h5>
                            <ul className="list-unstyled text-light">
                                <li>MON - FRI: 09:00 - 18:00</li>
                                <li>SAT: 10:00 - 14:00</li>
                                <li>SUN: DEPLOYED / CLOSED</li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <div className="p-4 border border-1 border-secondary shadow-sm">
                            <h2 className="text-danger h3 mb-4">- SEND A TRANSMISSION</h2>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label text-danger small fw-bold">NAME / CALLSIGN</label>
                                    <input type="text" className="form-control bg-dark text-white border-secondary custom-placeholder" placeholder="Enter name" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-danger small fw-bold">EMAIL ADDRESS</label>
                                    <input type="email" className="form-control bg-dark text-white border-secondary" placeholder="name@example.com" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-danger small fw-bold">SUBJECT</label>
                                    <select className="form-select bg-dark text-white border-secondary">
                                        <option>Technical Support</option>
                                        <option>Order Status</option>
                                        <option>Wholesale Inquiry</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-danger small fw-bold">MESSAGE</label>
                                    <textarea className="form-control bg-dark text-white border-secondary" rows="4" placeholder="Type your message..."></textarea>
                                </div>
                                <button type="submit" className="btn btn-outline-danger w-100 fw-bold py-2">SEND MESSAGE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage;