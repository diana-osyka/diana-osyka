import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceList from "./AttendanceList";
import styles from "../styles/StatisticsPage.module.css";

const StatisticsPage = () => {
  const navigate = useNavigate();

  const [attendanceData, setAttendanceData] = useState([]); // Empty array for testing no attendance scenario

  const totalPeople = 23;

  const handleUpdate = (updatedItem) => {
    setAttendanceData((prev) =>
      prev.map((item) =>
        item.name === updatedItem.name ? updatedItem : item
      )
    );
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
    <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerTitle}>
            <button
              className={styles.backButton}
              onClick={() => navigate(-1)}
            >
              ←
            </button>
            <h1 className={styles.title}>Internet veci</h1>
          </div>
          <button
            className={styles.settingsButton}
            onClick={() => navigate("/configuration")}
          >
            ⚙️
          </button>
        </div>
        <div className={styles.courseInfo}>
          <p>Pondelok 7:30 - 9:00</p>
          <p>Miroslav Binas</p>
        </div>
      </header>

      {/* Action Buttons */}
      <div className={styles.buttons}>
        <button
          className={styles.actionButton}
          onClick={() => navigate("/attendance-history")} // Navigate to attendance history
        >
          Pozriet historiu dochadzky
        </button>
        <button
          className={styles.actionButton}
          onClick={() => alert("Downloading attendance for the hour...")}
        >
          Stiahnut dochadzku hodiny
        </button>
        <button
          className={styles.actionButton}
          onClick={() => alert("Downloading attendance for the course...")}
        >
          Stiahnut dochadzku predmetu
        </button>
      </div>

      {/* Attendance Info */}
      <div className={styles.attendanceInfo}>
        <div>
          <p>L9-B 527 (Kronos)</p>
          <p>aktualizovane:</p>
          <p>7:51 14.09.25</p>
          <p>Pocet ludi: {totalPeople}</p>
        </div>
        <div className={styles.statusBadge}>teraz</div>
      </div>

      {/* Attendance List */}
      {attendanceData.length === 0 ? (
        <p class="infoMessage">Nie je žiadne cvičenie teraz.</p>
      ) : (
        <AttendanceList data={attendanceData} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default StatisticsPage;
