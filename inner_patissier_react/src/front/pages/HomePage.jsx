import React, { useRef } from 'react';
import { Hero, Testimonials, Offerings, Footer, Navbar } from '../components';

const HomePage = () => {
  const homeRef = useRef(null);
  const offeringsRef = useRef(null);
  const reviewsRef = useRef(null);
  const contactsRef = useRef(null);

  const sectionRefs = {
    home: homeRef,
    offerings: offeringsRef,
    reviews: reviewsRef,
    contacts: contactsRef,
  };

  return (
    <div>
      <Navbar sectionRefs={sectionRefs} />
      
      <section ref={homeRef} id="home" className="relative max-container padding-container ...">
        <Hero />
      </section>

      <section ref={offeringsRef} id="offerings" className="max-container padding-container ...">
        <Offerings />
      </section>

      <section ref={reviewsRef} id="reviews" className="max-container padding-container ...">
        <Testimonials />
      </section>

      <section ref={contactsRef} id="contacts" className="max-container padding-container ...">
        <Footer />
      </section>
    </div>
  );
};

export default HomePage;
