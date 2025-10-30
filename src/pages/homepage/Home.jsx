import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Banner from '../../components/banner/Banner'
import Whatsnew from '../../components/whatsnew/Whatsnew'
import Event from '../../components/events/Events'
import Footer from '../../components/footer/Footer'
import Copyright from '../../components/copyright/Copyright'

function Home() {
  sessionStorage.removeItem('userRole');
  return (
    <>
    
      <Navbar />
      <Banner />
      <Whatsnew />
      <Event />

      <Footer />
      {/* <Copyright /> */}
    </>
  );
}

export default Home;