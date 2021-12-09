import React from 'react'
import TopNavBar2 from './TopNavBar2'
import { useNavigate } from 'react-router';

export default function OrderSuccess() {
    const navigate = useNavigate();
    return (
        <div>
            <TopNavBar2 cart='4' />
            <h2>Order has been placed successfully!</h2>
            <div class="alert alert-success" role="alert">
                You will receive notification by email with order details soon. Thank You!
            </div>
            <button onClick={() => navigate('/Menu')} className="btn btn-dark">Go and order more</button>

        </div>
    )
}
