import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
    
    useEffect(()=>{
        document.title = 'GUNNER! - Home';
    });

    return(
        <div>
            <div className="container-fluid bg-dark text-light text-center my-1 p-5 border-top border-bottom border-2 border-danger">
                <div>
                    <h1 className="display-1 fw-black text-danger mb-0" style={{ letterSpacing: '-2px' }}>
                        GUNNER<span className="text-white">!</span>
                    </h1>
                    <div className="bg-danger text-dark fw-bold px-3 py-1 mb-4 d-inline-block mx-auto">
                        PREMIUM BLANK-FIRE REPLICAS
                    </div>
                    
                    <p className="fs-3 fw-light text-uppercase tracking-widest">
                        Your gun fantasy in one place.<br />
                        With <span className="text-danger fw-bold">Gunner</span>, your rival is a goner.
                    </p>

                    <div className="mt-5">
                        <Link to={'/Guns'} className="btn btn-outline-danger btn-lg px-5 py-3 fw-bold border-2 rounded-0 me-3">
                            BROWSE GUNS
                        </Link>
                    </div>

                    <p className="fs-6 mt-5 text-secondary fst-italic">
                        (these guns are legal i promise, please don't arrest me)
                    </p>
                </div>
            </div>

            <div className="container-fluid bg-dark text-light text-center my-1 p-5 border-top border-bottom border-2 border-danger">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h2 className="text-danger mb-4">- THE NEW STANDARD IN REALISM</h2>
                        <p className="lead text-secondary mb-4">
                            At <strong>GUNNER!</strong>, we bridge the gap between the screen and reality. 
                            We specialize in high-performance blank-firing firearms that deliver the 
                            raw, visceral experience of a live weapon without the lethal projectile.
                        </p>
                        <p className="fs-5">
                            From the weight of the steel to the thunderous crack of the muzzle flash, 
                            every replica we curate is selected for those who refuse to settle for 
                            plastic imitations. Whether you're a filmmaker needing a "hero" prop or 
                            a collector who appreciates precision engineering, you've found the source.
                        </p>
                        <div className="mt-5">
                            <hr className="border-danger border-2 w-25 mx-auto" />
                        </div>
                    </div>
                </div>
            </div>  
            
        </div>
    )
}

export default Home;