import { useEffect, useState } from "react";
import axios from "axios";

import Card from '../comp/productCard';
import Loader from "../comp/loader";

function FavoritesPage(){

    const [guns, setGuns] = useState(null);

    async function getGuns() {
        const res = await axios.get('/api/favorite');
        setGuns(res.data);
    }

    useEffect(()=>{
        document.title = 'GUNNER! - Favorites';

        getGuns();
    });

    if(!guns) return <Loader />
    
    return(
        <div className="container-fluid my-1 p-5 bg-dark border-top border-bottom border-2 border-danger">
            <h1 className="text-danger text-center">Favorites</h1>
            <hr className="border border-3 border-danger w-50 rounded mx-auto" />

            <div className="col-md-9 container-fluid d-flex flex-column flex-md-row gap-4 flex-wrap justify-content-center align-items-center">
                {guns.map(gun => (
                    <Card gun={gun} />
                ))}
            </div>
        </div>
    )
}

export default FavoritesPage;
