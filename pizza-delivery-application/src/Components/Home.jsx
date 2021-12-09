import React from 'react';
import TopNavBar from './TopNavBar';
import { useNavigate } from 'react-router';

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="">
            <TopNavBar />
            <div class="jumbotron ">
                <h1 class="display-4"><b> Pizza  Delivery </b></h1>
                <p class="lead"> Welcome to pizza delivery service. This is the place when you may chose the most delicious pizza you like from wide variety of options!</p>
                <hr class="my-4" />
                <p> We're performing delivery free of charge in case if your order is higher than 20$ </p>
                <p class="lead">
                    <button class="btn btn-dark btn-lg btn-block" onClick={()=>navigate('/SignUp')} > Sign In and Order </button>
                </p>
            </div>

        </div>
    )
}
