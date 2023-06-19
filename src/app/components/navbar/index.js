import logo from "../../assets/logo.png"
const navBar = () => {
    return (

        <nav>
            <div className="container-logo">
               <a href="/" className="logo">

                <img src={logo} alt="logo" />
               </a>
            </div>
            <hr />
        </nav>
    )
}

export default navBar;

