import { Link } from "react-router-dom"

export function Nav() {
    return(
        <>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Regixter</Link></li>
                    <li><Link to="/secure">Secure</Link></li>
                </ul>
            </nav>
        </>
    );
}
