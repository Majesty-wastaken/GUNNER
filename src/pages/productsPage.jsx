import { useEffect, useState } from "react";
import axios from "axios";

import Card from "../comp/productCard";
import Loader from "../comp/loader";

function ProductsPage(){
    const [guns, setGuns] = useState(null);
    const [categories, setCategories] = useState(null);
    const [ammos, setAmmos] = useState(null);

    async function getGuns() {
        const res = await axios.get("http://localhost:5000/guns");
        setGuns(res.data);
    }
    
    async function getCategories() {
        const res = await axios.get("http://localhost:5000/guns/categories");
        setCategories(res.data);
    }

    async function getGunsByCategory(category)  {
        const res = await axios.get(`http://localhost:5000/guns/category/${category}`);
        setGuns(res.data);
    }

    async function getAmmos() {
        const res = await axios.get("http://localhost:5000/guns/ammos");
        setAmmos(res.data);
    }

    async function getGunsByAmmo(ammo)  {
        const res = await axios.get(`http://localhost:5000/guns/ammo/${ammo}`);
        setGuns(res.data);
    }

    async function priceOrderASC() {
        const res = await axios.get('http://localhost:5000/guns/price-asc');
        getGuns(res.data);
    }
    async function priceOrderDESC() {
        const res = await axios.get('http://localhost:5000/guns/price-desc');
        getGuns(res.data);
    }

    useEffect(()=>{
        document.title = 'GUNNER! - Guns';

        getGuns();
        getCategories();
        getAmmos();
    }, []);

    if(!guns || !categories || !ammos) return <Loader />

    return(
        <div className="container-fluid my-1 p-5 bg-dark border-top border-bottom border-2 border-danger">
            <h1 className="text-danger text-center">GUNS!</h1>
            <hr className="border border-3 border-danger w-50 rounded mx-auto" />
            
            <div className="row gap-4 mt-4">
                
                <div className="col-md-3 border border-2 border-danger p-4 h-100">
                    <h3 className="text-light">Filter</h3>

                    <div className="d-flex flex-column">
                        <p className="text-secondary">Categories</p>
                        <button className="btn btn-danger" onClick={getGuns}>All</button>
                        {categories.map(c => (
                            <button key={c.category} className="btn btn-outline-danger m-2" onClick={() => getGunsByCategory(c.category)}>{c.category}</button>
                        ))}
                    </div>

                    <div className="d-flex flex-column">
                        <p className="text-secondary">Prices</p>
                        <button className="btn btn-outline-danger m-2" onClick={() => priceOrderASC()}>Lower to Higher</button>
                        <button className="btn btn-outline-danger m-2" onClick={() => priceOrderDESC()}>Higher to Lower</button>
                    </div>

                    <div className="d-flex flex-column">
                        <p className="text-secondary">Ammo</p>
                        {ammos.map(a => (
                            <button key={a.ammo} className="btn btn-outline-danger m-2" onClick={() => getGunsByAmmo(a.ammo)}>{a.ammo}</button>
                        ))}
                    </div>
                </div>

                <div className="col-md-8 container-fluid d-flex flex-column flex-md-row gap-4 flex-wrap justify-content-center align-items-center">
                    {guns.map(gun => (
                        <Card key={gun.slug} gun={gun} />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default ProductsPage;