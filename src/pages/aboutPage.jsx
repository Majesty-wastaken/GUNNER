import { useEffect } from "react";

function AboutPage(){

    useEffect(()=>{
        document.title = 'GUNNER! - About us';
    });

    return(
        <div className="container-fluid my-1 p-5 bg-dark border-top border-bottom border-2 border-danger">
            <h1 className="text-danger text-center">About us</h1>
            <hr className="border border-3 border-danger w-50 rounded mx-auto" />

            <div className="container">
                <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                    
                    <section className="mb-5">
                    <h2 className="text-danger h3 uppercase">- INTRODUCTION</h2>
                    <p className="text-light">
                        Welcome to <strong>GUNNER!</strong>—the premier destination for high-fidelity blank-firing replicas. 
                        We don’t deal in toys. We deal in <strong>weight, sound, and steel.</strong> Our platform was 
                        engineered for those who demand the visceral experience of a firearm with the specialized 
                        application of blank-fire technology. Whether it's for the screen, the stage, or the collection, 
                        we bring the heat.
                    </p>
                    </section>

                    <hr className="border-secondary opacity-25 mb-5" />

                    <section className="mb-5">
                    <h2 className="text-danger h3">- WHO WE ARE</h2>
                    <p className="text-light">
                        We are a collective of ballistics enthusiasts, prop masters, and tactical trainers who realized 
                        the market was missing a "no-nonsense" supplier. Based on a foundation of technical expertise, 
                        <strong> GUNNER!</strong> operates at the intersection of craftsmanship and adrenaline. We aren't 
                        just resellers; we are curators of precision-engineered equipment designed to look, feel, and 
                        cycle exactly like the real thing.
                    </p>
                    </section>

                    <hr className="border-secondary opacity-25 mb-5" />

                    <section className="mb-5">
                    <h2 className="text-danger h3">- WHY US</h2>
                    <div className="row g-4 mt-2">
                        <div className="col-md-12">
                        <h4 className="text-danger h5">UNRIVALED REALISM</h4>
                        <p className="small text-light">Our replicas feature authentic blowback actions and full-metal construction. If it doesn't feel right in the hand, we don't sell it.</p>
                        </div>
                        <div className="col-md-12">
                        <h4 className="text-danger h5">BATTLE-TESTED QUALITY</h4>
                        <p className="small text-light">Every model is vetted for mechanical reliability, ensuring consistent cycling and firing when the red light is on or the drill starts.</p>
                        </div>
                        <div className="col-md-12">
                        <h4 className="text-danger h5">LEGAL & SECURE</h4>
                        <p className="small text-light">We navigate the complexities of compliance so you don't have to. All our inventory meets strict non-convertible safety standards.</p>
                        </div>
                    </div>
                    </section>

                </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage;