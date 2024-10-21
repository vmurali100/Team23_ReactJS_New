import { Component } from "react";

export class Banner extends Component{
    render(){
         
        return <section class="banner">
            <div class="banner-wrapper-main"></div>
            <div class="container">
                <div class="row">
                    <div class="slider-wrapper">
                        <div class="box-01">
                            <div class="content">
                                <h1>BROADEN YOUR KNOWLEDGE WITH TUTORS</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quasi laborum deserunt necessitatibus. Earum excepturi nobis, 
                                reprehenderit deserunt minima, veniam omnis libero, debitis fugiat autem alias eos architecto? In, eos!</p>
    
                                <div class="btn-001">
                                    <ul>
                                        <li><a href="#">GET STARTED NOW</a></li>
                                        <li><a href="#">VIEW COURSES</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="box-01">
                            <div class="slider-image">
                                <img src="assets/images/slider/1.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
    }
}