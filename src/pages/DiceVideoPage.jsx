import React, { useEffect, useState, useRef } from "react";
import "./DiceVideoPage.scss";
import Footer from "../components/Footer";

function getRandomValue() {
  return Math.floor(Math.random() * 6) + 1;
}

function DiceVideoPage() {
  const NUMBER_OF_DICE = 6;
  const [dice, setDice] = useState([]);
  const videoRef = useRef(null);

  // Sayfa ilk açıldığında tüm zarların değeri 0 olacak şekilde başlatıyoruz.
  useEffect(() => {
    const initialDice = [];
    for (let i = 0; i < NUMBER_OF_DICE; i++) {
      initialDice.push({ value: 0, held: false });
    }
    setDice(initialDice);
  }, []);

  // Zarların toplamını hesapla
  const totalDiceValue = dice.reduce((acc, die) => acc + die.value, 0);

  // Roll Dice: "held" olmayan zarların değerlerini 1-6 arası rastgele ata
  const rollDice = () => {
    setDice(prevDice =>
      prevDice.map(d =>
        d.held ? d : { ...d, value: getRandomValue() }
      )
    );
  };

  // "Hold" kutusu: Zarın sabit kalmasını sağlar
  const toggleHold = index => {
    setDice(prevDice =>
      prevDice.map((d, i) =>
        i === index ? { ...d, held: !d.held } : d
      )
    );
  };

  // Zarların toplamı değiştikçe, videonun sesini 0-1 aralığında ayarla ve mute durumunu güncelle
  useEffect(() => {
    if (videoRef.current) {
      const maxDiceValue = NUMBER_OF_DICE * 6; // Maksimum 36
      const newVolume = totalDiceValue / maxDiceValue;
      videoRef.current.volume = newVolume;
      // Eğer toplam 0 ise video mute, değilse mute kaldırılır
      videoRef.current.muted = totalDiceValue === 0;
    }
  }, [totalDiceValue]);

  return (
    <div className="dice-video-page">
      
      {/* --- Hero/Silly Başlık Bölümü --- */}
      <div className="hero-section">
        <h1 className="hero-title">Sesinizi Şansınız Belirlesin!</h1>
        <p className="hero-desc">
        </p>
      </div>
      
      {/* --- İçerik Bölümü --- */}
      <div className="content-container">
        <p className="intro-text">
          "Roll Dice" butonuna basın; tutulmayan zarlar rastgele değer alacak ve toplam zar değeri, videonun sesini ayarlayacak.
        </p>
        
        <div className="dice-section">
          {dice.map((die, idx) => (
            <div key={idx} className="die">
              <div className="die-value">{die.value}</div>
              <label className="hold-label">
                <input
                  type="checkbox"
                  checked={die.held}
                  onChange={() => toggleHold(idx)}
                />
                Hold
              </label>
            </div>
          ))}
        </div>
        
        <button onClick={rollDice} className="roll-button">
          Roll Dice
        </button>
        
        <div className="volume-info">
          Toplam Zar: <strong>{totalDiceValue}</strong>
        </div>
        
        {/* --- Video Bölümü --- */}
        {/* autoPlay, muted, playsInline: Video otomatik sessiz oynatılır. */}
        {/* controls veriyoruz ama sesle ilgili kontroller CSS ile gizlenecek */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          controls
          className="video-player"
        >
          <source src="/sample-video.mp4" type="video/mp4" />
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      </div>

       {/* footer */}
       <Footer />
      
    </div>
    
  );
}

export default DiceVideoPage;
