import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import PropertyList from './components/PropertyList';
import PropertySearch from './components/PropertySearch';
import PropertyDetails from './components/PropertyDetails';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Banner />
              <AboutUs />
              <PropertyList />
              <Contact />
            </>
          } />
          <Route path="/search" element={<PropertySearch />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;