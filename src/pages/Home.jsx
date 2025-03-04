import React from "react";
import "./Home.scss";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-container">
      {/* Hero / Başlık Bölümü */}
      <header className="hero-section">
        <h1 className="hero-title">Silly Website</h1>
        <p className="hero-subtitle">
          İnternette gördüğüm saçma şeyleri ve aklıma gelen garip fikirleri
          denemek için oluşturduğum mini laboratuvar!
        </p>
      </header>



      {/* footer */}
      <Footer />
    </div>
  );
}

export default Home;
