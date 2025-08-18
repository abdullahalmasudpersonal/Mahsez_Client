
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>403 - Unauthorized</h1>
            <p>You don’t have permission to access this page.</p>
            <Link to="/">Go Home</Link>
        </div>
    );
};

export default Unauthorized;