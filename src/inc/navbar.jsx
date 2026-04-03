import { NavLink, Link } from "react-router-dom";

function Navbar(){
    return(
        <div>
            <header className="navbar navbar-expand-lg fixed-top bg-dark navbar-dark py-3 border-bottom border-secondary">
                <nav className="container-fluid mx-5">
                    <Link to={'/'} className="navbar-brand text-danger">GUNNER!</Link>
                    <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="offcanvas offcanvas-end bg-dark" tabIndex="-1" id="offcanvasNavbar" data-bs-auto-close="true" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header px-5">
                            <Link to={'/'} className="navbar-brand">GUNNER!</Link>
                            <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body px-5 py-lg-0 py-4">
                            <div className="navbar-nav ms-auto">
                                <NavLink to={'/'} className='nav-link my-lg-0 my-2 mx-2'><i className="fa-solid fa-house"></i> Home</NavLink>
                                <NavLink to={'/Guns'} className='nav-link my-lg-0 my-2 mx-2'><i className="fa-solid fa-gun"></i> Guns</NavLink>
                                <NavLink to={'/About'} className='nav-link my-lg-0 my-2 mx-2'><i className="fa-solid fa-circle-info"></i> About us</NavLink>
                                <NavLink to={'/Contact'} className='nav-link my-lg-0 my-2 mx-2'><i className="fa-solid fa-envelope"></i> Contact us</NavLink>
                            </div>
                            <hr className="d-lg-none border border-light border-2 rounded w-25 mx-auto"/>
                            <div className="navbar-nav ms-auto">
                                <NavLink to={'/Favorites'} className='nav-link text-danger my-lg-0 my-2 me-2'><i className="fa-solid fa-heart"></i> <span className="d-lg-none">Favorites</span></NavLink>
                                <NavLink to={'/Cart'} className='nav-link text-danger my-lg-0 my-2'><i className="fa-solid fa-cart-shopping"></i>  <span className="d-lg-none">Cart</span></NavLink>
                                <div className="dropdown open">
                                    <button className="nav-link text-danger my-lg-0 my-2" type="button" id="triggerId" data-bs-auto-close="outside" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa-solid fa-circle-user"></i>  <span className="d-lg-none">Profile</span>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-start bg-dark px-lg-0 px-5 rounded-0 border-0 shadow" aria-labelledby="triggerId">
                                        <NavLink to={'/Profile'} className='nav-link text-danger my-lg-0 my-2'>Profile</NavLink>
                                        
                                        <hr className="dropdown-divider w-50 mx-auto" />
                                        <NavLink to={''} className='nav-link text-danger my-lg-0 my-2'>Logout</NavLink>
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>
                </nav>

            </header>
            {/* Makes up for the space removed by the fixed navbar */}
            <div className="py-4">.</div>
        </div>
    )
}

export default Navbar;
