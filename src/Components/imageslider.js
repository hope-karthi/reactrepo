import React, { useState } from 'react'
import {FaArrowAltCircleRight,FaArrowAltCircleLeft} from 'react-icons/fa';


const Imageslider = () => {
    const [current,setCurrent] = useState(0);
    const length = Sliderdata.length;

    const nxtSlide = () => {
        setCurrent(current === length -1 ? 0: current + 1);
    };
    const prevSlide =() =>{
        setCurrent (current === 0 ? length -1 : current - 1);
    };
    console.warn(current);
    if (!Array.isArray(Sliderdata) || Sliderdata.length <= 0){
        return null;
    }
  return (
      <section class='slider'>
        <FaArrowAltCircleLeft class='left-arrow' onClick={prevSlide}/>
        <FaArrowAltCircleRight class="right-arrow" onClick={nxtSlide}/>
        {Sliderdata.map((pic,index)=>{
            return (<div class={index === current ? 'slide active' : 'slide'} key={index}>
                {index === current && (<img class='image' src={pic} alt={index}></img>
            )}</div>)
        })}
      </section>
  )
}

export default Imageslider