import { useEffect } from "react";

function NotFound() {
    
    useEffect(()=>{
        document.title = 'GUNNER! - Page Not Found!';
    });

    return(
        <div className="container-fluid bg-dark text-light text-center my-5 p-5 border-top border-bottom border-2 border-danger">
            <h1 className="py-5">GUNNER!</h1>
            <p className="fs-4">OOPS! it seems this page doesn't exist.</p>
            <p className="fs-6 pb-5">Make sure you're in the right place.</p>
        </div>
    )
}

export default NotFound;