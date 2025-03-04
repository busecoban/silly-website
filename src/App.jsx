// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Bileşenler (yan menü vs.)
import SideMenu from "./components/SideMenu";

// Sayfalar
import Home from "./pages/Home";
import DiceVideoPage from "./pages/DiceVideoPage";

// SCSS veya CSS dosyaları (isteğe bağlı)
import "./App.css";       // opsiyonel
import "./index.scss";    // opsiyonel

function App() {
  return (
    <Router>
      {/* Tüm uygulamanın iskeleti */}
      <div className="app-container">
        
        {/* Sol tarafta sabit bir yan menü */}
        <SideMenu />

        {/* Sağ tarafta Router’daki path’e göre değişen içerikler */}
        <div className="page-content">
          <Routes>
            {/* Anasayfa ("/") -> Home bileşeni */}
            <Route path="/" element={<Home />} />

            {/* Diğer sayfalar */}
            <Route path="/bad-ui-1" element={<DiceVideoPage />} />
            {/* Yeni rota eklemek isterseniz: 
                <Route path="/something" element={<Something />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
