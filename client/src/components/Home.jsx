import axios from 'axios';
import React, { useEffect } from 'react';
import '../css/Home.css';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpeg';

const Home = () => {
  return (
    <div className='hero'>
      <div className="appc">
        <div className="work">
          <div className='hero-content'>
            <h1 className='hero-text'>Laboratoire Vital</h1>
            <p className='hero-description'>
            Bienvenue sur notre plateforme de gestion des lots - travaillez efficacement et en toute simplicité !
            </p>
          </div>
          <div className='hero-images'>
            <img src={image1} alt="Image 1" className='hero-image'/>
            <img src={image2} alt="Image 2" className='hero-image'/>
            <img src={image3} alt="Image 3" className='hero-image'/>
            <img src={image4} alt="Image 4" className='hero-image'/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
