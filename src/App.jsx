import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';

import Home from './pages/homePage';
import ProductsPage from './pages/productsPage';
import ProductDetailsPage from './pages/productDetailsPage';
import FavoritesPage from './pages/favoritePage';
import CartPage from './pages/cartPage';
import CheckoutPage from './pages/checkoutPage';
import TrackingPage from "./pages/trackingPage";
import AboutPage from './pages/aboutPage';
import ContactPage from './pages/contactPage';

import NotFound from "./notFound";
import Navbar from './inc/navbar';
import Footer from './inc/footer';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './css/rootStyle.css';

function App() {
    return(
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/Guns" element={<ProductsPage />} />
                <Route path="/Guns/:slug" element={<ProductDetailsPage />}/>
                <Route path="/Favorites" element={<FavoritesPage />}/>
                <Route path="/Cart" element={<CartPage />}/>
                <Route path="/Checkout" element={<CheckoutPage />}/>
                <Route path="/Tracking" element={<TrackingPage />}/>
                <Route path="/About" element={<AboutPage />}/>
                <Route path="/Contact" element={<ContactPage />}/>

                <Route path="*" element={<NotFound />}/>
            </Routes>

            <Footer />
            <Analytics />
        </BrowserRouter>
    )
};

export default App;