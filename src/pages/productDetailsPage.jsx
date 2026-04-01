import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Loader from "../comp/loader";

function ProductDetailsPage(){
    const {slug} = useParams();
    const [isFav, setIsFav] = useState(false);
    const [gun, setGun] = useState(null);

    function getCartID() {
        let id = localStorage.getItem("gunner_cart_id");
        if (!id) {
            id = Math.floor(Math.random() * 1000000);
            localStorage.setItem("gunner_cart_id", id);
        }
        return id;
    };

    async function getGun() {
        const res = await axios.get(`/guns/${slug}`);
        setGun(res.data);
    }

    async function handleAddToCart(productSlug) {
        const cartID = getCartID();
        try {
            const res = await axios.post('/cart/add', {
                cartID: cartID,
                productSlug: productSlug,
                quantity: 1
            });
            alert(res.data.message);
        } catch (err) {
            console.error("Cart Error:", err);
            alert("Failed to add to armory.");
        }
    }
        
    useEffect(()=>{
        document.title = `GUNNER! - ${slug}`;

        async function checkStatus() {
            try{
                const res = await axios.get(`/favorited-status/${slug}`);
                setIsFav(res.data.favorited === "true");
            }
            catch(err) {
                console.error(`Error: ${err}`);
            }
        };
        
        checkStatus();

        getGun();
    }, [slug]);

    async function handleToggle(e) {
        e.stopPropagation();

        try{
            const res = await axios.patch(`/favorited/${slug}`);
            setIsFav(res.data.favorited === "true");
        }
        catch(err) {
            console.error(`Toggle Failed: ${err}`);
        }
    }

    if(!gun) return <Loader />

    return(
        <div>
            {gun.map(g => (
                <div className="container-fluid my-1 p-5 bg-dark border-top border-bottom border-2 border-danger" key={g.slug}>
                    <div className="row text-light">
                        <div className="col-md-5">
                            <button className="text-danger border-0 bg-transparent position-absolute end-0 m-2 py-0 px-2 fs-4" onClick={handleToggle}>
                                {isFav ? <span className="text-danger">❤</span> : <span className="text-secondary">❤</span>}
                            </button>
                            {g.image ?
                                <img src={`/images/${g.image}`} alt={g.name} className="w-100" />
                                : <div className="card-head text-center py-3">no image!</div>}
                        </div>
                        <div className="col-md-7 mt-lg-0 mt-5">
                            <h1 className="text-danger">{g.name}</h1>
                            
                            <p>{g.description}</p>

                            <div className="mt-4">
                                <p className="text-secondary">info:</p>
                                <p>Type: <span className="text-danger">{g.category}</span></p>
                                <p>Price: <span className="text-danger">${g.price}</span></p>
                                <p>Ammunition: <span className="text-danger">{g.ammo}</span></p>
                                {g.weight ? <p>Weight: <span className="text-danger">{g.weight}lbs</span></p> : ''}
                            </div>
                        </div>
                    </div>
                    <div className="pt-5 text-danger d-flex justify-content-between">
                        <Link to={'/Guns'} className="btn btn-danger">Back to Guns</Link>
                        <button className="btn btn-danger" onClick={() => handleAddToCart(g.slug)}>
                            Add to cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductDetailsPage;