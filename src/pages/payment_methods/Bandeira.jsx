import React, { useState } from "react";

const bandeiras = [
  { nome: "Visa", src: "https://download.logo.wine/logo/Visa_Inc./Visa_Inc.-Logo.wine.png" },
  { nome: "MasterCard", src: "https://download.logo.wine/logo/Mastercard/Mastercard-Logo.wine.png" },
  { nome: "AmericanExpress", src: "https://1000logos.net/wp-content/uploads/2016/10/American-Express-Color.png" },
  { nome: "Hiper", src: "https://logodownload.org/wp-content/uploads/2015/03/hipercard-logo-1.png" },
  { nome: "Elo", src: "https://logodownload.org/wp-content/uploads/2017/04/elo-logo-7.png" }
];

const Bandeira = ({ value, onChange }) => {
  const [hoveredBandeira, setHoveredBandeira] = useState(null);

  const handleMouseEnter = (bandeira) => {
    setHoveredBandeira(bandeira);
  };

  const handleMouseLeave = () => {
    setHoveredBandeira(null);
  };

  const handleBandeiraChange = (e) => {
    const selectedBandeira = e.target.value;
    onChange(selectedBandeira);
  };

  return (
    <div className="bandeiras_line">
      {bandeiras.map((bandeira) => (
        <label
          key={bandeira.nome}
          className={`bandeira-label ${value === bandeira.nome ? "selected" : ""}`}
          onMouseEnter={() => handleMouseEnter(bandeira.nome)}
          onMouseLeave={handleMouseLeave}
        >
          <input
            type="radio"
            name="brand"
            value={bandeira.nome}
            checked={value === bandeira.nome}
            onChange={handleBandeiraChange}
            required
            style={{ display: "none" }}
          />
          <img
            className={`bandeira-img ${hoveredBandeira === bandeira.nome ? "hovered" : ""}`}
            src={bandeira.src}
            alt={bandeira.nome}
          />
        </label>
      ))}
    </div>
  );
};

export default Bandeira;
