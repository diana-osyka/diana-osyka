import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ConfigurationPage.module.css";

const ConfigurationPage = () => {
  const navigate = useNavigate();

  const [room, setRoom] = useState("L9-B 527 (Kronos)");
  const [wifiName, setWifiName] = useState("NazovSiete");
  const [wifiPassword, setWifiPassword] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!room.trim() || room.length > 40) {
      setError("Miestnosť musí byť zadaná a kratšia ako 40 znakov.");
      return;
    }
    if (!wifiName.trim() || wifiName.length > 40) {
      setError("Meno siete musí byť zadané a kratšie ako 40 znakov.");
      return;
    }
    if (!wifiPassword.trim() || wifiPassword.length > 40) {
      setError("Heslo musí byť zadané a kratšie ako 40 znakov.");
      return;
    }

    alert(`Saved Configuration:\nRoom: ${room}\nWiFi Name: ${wifiName}\nWiFi Password: ${wifiPassword}`);
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Konfiguracia</h1>
      {error && <p class="error">{error}</p>}

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Informacia</h2>
        <label className={styles.label}>V ktorej miestnosti sa nachadza</label>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>WiFi</h2>
        <label className={styles.label}>Uvedzte meno siete</label>
        <input
          type="text"
          value={wifiName}
          onChange={(e) => setWifiName(e.target.value)}
          className={styles.input}
        />
        <label className={styles.label}>Uvedzte heslo siete</label>
        <input
          type="password"
          value={wifiPassword}
          onChange={(e) => setWifiPassword(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.buttons}>
        <button className={styles.cancelButton} onClick={handleCancel}>
          Zrušiť
        </button>
        <button className={styles.saveButton} onClick={handleSave}>
          Ulozit zmeny
        </button>
      </div>
    </div>
  );
};

export default ConfigurationPage;
