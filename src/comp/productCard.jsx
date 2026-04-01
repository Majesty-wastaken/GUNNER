import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Card({gun}){
    const [isFav, setIsFav] = useState(false);

    function getCartID() {
        let id = localStorage.getItem("gun_cart_id");
        if (!id) {
            id = Math.floor(Math.random() * 1000000);
            localStorage.setItem("gun_cart_id", id);
        }
        return id;
    };

    useEffect(() => {
        async function checkStatus() {
            try{
                const res = await axios.get(`/favorited-status/${gun.slug}`);
                setIsFav(res.data.favorited === "true");
            }
            catch(err) {
                console.error(`Error: ${err}`);
            }
        };
        
        checkStatus();
    }, [gun.slug]);

    async function handleToggle(e) {
        e.preventDefault();
        e.stopPropagation();

        try{
            const res = await axios.patch(`/favorited/${gun.slug}`);
            setIsFav(res.data.favorited === "true");
        }
        catch(err) {
            console.error(`Toggle Failed: ${err}`);
        }
    }

    async function handleAddToCart(e) {
        e.preventDefault();
        e.stopPropagation();

        const cartID = getCartID();
        try {
            await axios.post('/cart/add', {
                cartID: cartID,
                productSlug: gun.slug,
                quantity: 1
            });
        } catch (err) {
            console.error("Cart Error:", err);
        }
    }

    return(
        <Link to={`/Guns/${gun.slug}`} className="text-decoration-none">
            <div className="card rounded-0 bg-dark text-light border-0 border-end border-start border-danger shadow">
                <div>
                    
                    <button className="text-danger border-0 bg-transparent position-absolute end-0 m-2 py-0 px-2 fs-4" onClick={handleToggle}>
                        {isFav ? <span className="text-danger">❤</span> : <span className="text-secondary">❤</span>}
                    </button>
                    {gun.image ?
                        <img src={`/images/${gun.image}`} alt={gun.name} className="card-img-top rounded-0" />
                        : <div className="card-head text-center py-3">no image!</div>}
                </div>
                    <div className="card-body">
                        <p className="card-title text-danger">{gun.name}</p>
                        <p className="fs-6 text-secondary">{gun.description}</p>
                        <p className="text-secondary">Price <span className="text-danger">{gun.price}</span></p>
                        
                    </div>
                    <div className="card-footer text-danger d-flex justify-content-between border-secondary">
                        <button className="bg-transparent border-0 p-1 text-danger text-decoration-underline" onClick={() => handleAddToCart(gun.slug)}>
                            Add to cart
                        </button>
                        <button className="bg-transparent border-0 p-1 text-danger text-decoration-underline">Learn more</button>
                    </div>
            </div>
        </Link>
    )
}

export default Card;