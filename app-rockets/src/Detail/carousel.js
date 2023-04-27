import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Carousel = (a) => {
    var settings = {
        dots: true,
        infinite: true,
       // speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
      }
      console.log(a.image)
  
      return (
        <Slider {...settings}>
            { a.image.map((a,i)=>(
            <div key ={i} style={{width:"400px"}}>
                <img src = {a}></img>
            </div>
            
           ))} 
   
        </Slider>
  )
}

export default Carousel