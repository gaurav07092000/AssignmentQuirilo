import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="btn-group">
              <Link to='/add-site'><button className="btn btn-primary">Add Site</button></Link>
              <Link to='/add-zone'><button className="btn btn-secondary">Add Zone</button></Link>
            </div>
        </div>
    );
};

export default LandingPage;
