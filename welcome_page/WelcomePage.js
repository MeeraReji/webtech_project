import React from 'react';
import './WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <img src={process.env.PUBLIC_URL + '/welcome_image.png'} alt="Once Upon a Flame Logo" className="welcome-logo" />
      <h1>Welcome to Once Upon a Flame!</h1>
      <p>Experience the Magic of Culinary Delights</p>
      
      <button className="reserve-button">Login</button>

      <div className="operating-hours">
        <h2>Operating Hours</h2>
        <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
        <p>Saturday - Sunday: 12:00 PM - 11:00 PM</p>
      </div>
      
      <div className="about-us">
        <h2>About Us</h2>
        <p>
          Once Upon a Flame is a place where stories come alive through the art of cooking. Our dedicated chefs craft each dish with passion, ensuring every bite tells a tale of flavor and texture. Nestled in the heart of Cityville, our warm and inviting ambiance sets the stage for unforgettable dining experiences. From the crackling flames to the exquisite plating, every detail is designed to transport you to a world of gastronomic delight. Come join us and let your taste buds embark on an extraordinary journey.
        </p>
      </div>

      <div className="gallery">
        <div className="gallery-images">
          <img src={process.env.PUBLIC_URL + '/restaurant_image1.jpg'} alt="Gallery Image 1" />
          <img src={process.env.PUBLIC_URL + '/restaurant_image2.jpg'} alt="Gallery Image 2" />
          <img src={process.env.PUBLIC_URL + '/restaurant_image3.jpg'} alt="Gallery Image 3" />
          {/* Add more images as needed */}
        </div>
      </div>



      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>Address: 123 Main Street, Cityville</p>
        <p>Phone: (123) 456-7890</p>
        <p>Email: info@onceuponflame.com</p>
      </div>
    </div>
  );
}

export default WelcomePage;
