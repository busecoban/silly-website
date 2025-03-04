import React, { useEffect, useState, useRef } from "react";
import "./DiceVideoPage.scss";
import Footer from "../components/Footer";

function getRandomValue() {
  return Math.floor(Math.random() * 6) + 1;
}

function DiceVideoPage() {
  const NUMBER_OF_DICE = 6;
  const [dice, setDice] = useState(Array(NUMBER_OF_DICE).fill({ value: getRandomValue(), held: false }));
  const [rolling, setRolling] = useState(false);
  const videoRef = useRef(null);

  // Sayfa ilk açıldığında tüm zarların değeri 1-6 arası rastgele olacak şekilde başlatıyoruz.
  useEffect(() => {
    const initialDice = [];
    for (let i = 0; i < NUMBER_OF_DICE; i++) {
      initialDice.push({ value: getRandomValue(), held: false });
    }
    setDice(initialDice);
  }, []);

  // Zarların toplamını hesapla
  const totalDiceValue = dice.reduce((acc, die) => acc + die.value, 0);

  // Roll Dice: "held" olmayan zarların değerlerini 1-6 arası rastgele ata
  const rollDice = () => {
    setRolling(true);
    setTimeout(() => {
      setDice(prevDice =>
        prevDice.map(d => (d.held ? d : { ...d, value: getRandomValue() }))
      );
      setRolling(false);
    }, 500); // Match the duration of the animation
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
      const newVolume = Math.pow(totalDiceValue / maxDiceValue, 2); // Use quadratic scaling for more noticeable differences
      videoRef.current.volume = newVolume;
      videoRef.current.muted = totalDiceValue === 0;
    }
  }, [totalDiceValue]);

  return (
    <div className="dice-video-page">
      {/* --- Hero/Silly Başlık Bölümü --- */}
      <div className="hero-section">
        <h1 className="hero-title">Sesinizi Şansınız Belirlesin!</h1>
       
      </div>

      {/* --- İçerik Bölümü --- */}
      <div className="content-container">
        <p className="intro-text">
          "Roll Dice" butonuna basın; tutulmayan zarlar rastgele değer alacak ve toplam zar değeri,
          videonun sesini ayarlayacak.
        </p>

        <div className="dice-section">
          {dice.map((die, idx) => (
            <div key={idx} className="die">
              {/* Zar resmi: public klasöründeki dosyayı dinamik olarak gösteriyoruz */}
              <img
                src={`/dice-${die.value}.png`}
                alt={`Dice face ${die.value}`}
                className={`die-image ${rolling && !die.held ? 'rolling' : ''}`}
              />
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
        {/* Video otomatik sessiz oynatılır; kontrol çubuğundaki sesle ilgili kısımlar SCSS ile gizlenecek */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          controls
          className="video-player"
        >
          <source src="/sample-video.mp4" type="video/mp4" />
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default DiceVideoPage;
