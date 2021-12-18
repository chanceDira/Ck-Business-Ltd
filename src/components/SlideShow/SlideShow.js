import React from 'react';
import { Zoom } from 'react-slideshow-image';
import { Link } from "react-router-guard"

const slideImages = [
    'https://cdn.pixabay.com/photo/2017/03/19/01/43/living-room-2155376_960_720.jpg',
    'https://cdn.pixabay.com/photo/2016/11/19/13/06/bed-1839184_960_720.jpg',
    'https://cdn.pixabay.com/photo/2016/03/15/02/42/floor-1256804_960_720.jpg'
];

const Slideshow = () => {
    const zoomInProperties = {
        indicators: true,
        scale: 1.4
      }
    return (
      <div>
        <Zoom {...zoomInProperties}>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
              <span>Urakaza neza kuri C.K Business Ltd iwacu i Rwanda<br/> <button type="button" class="btn btn-info w-50"><Link to="/trainer">REGISTER AS TRAINEE</Link> </button></span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
            <span>Welcome on C.K Business Ltd here in Rwanda<br/>  <button type="button" class="btn btn-info w-50"> <Link to="/trainer">REGISTER AS TRAINEE</Link> </button> </span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
            <span>Bienvenue au C.K Business Ltd ici au Rwanda  <br/>  <button type="button" class="btn btn-info w-50"> <Link to="/trainer">REGISTER AS TRAINEE</Link> </button> </span>
           
            </div>
          </div>
        </Zoom>
      </div>
    )
};

export default Slideshow;