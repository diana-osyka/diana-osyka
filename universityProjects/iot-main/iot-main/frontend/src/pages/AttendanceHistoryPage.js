import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import attendanceService from "../services/attendanceService";
import styles from "../styles/AttendanceHistoryPage.module.css";

const AttendanceHistoryPage = () => {
  const navigate = useNavigate();
  const [weeks, setWeeks] = useState([]); // Array to store weeks
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        const currentWeek = await attendanceService.getCurrentWeek(); // Fetch the current week number
        const weeksArray = Array.from({ length: currentWeek }, (_, i) => i + 1); // Generate weeks from 1 to currentWeek
        setWeeks(weeksArray);
      } catch (err) {
        setError("Failed to fetch the current week.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeeks();
  }, []);

  const handleViewWeek = (weekId) => {
    navigate(`/weekly-attendance/${weekId}`);
  };

  if (loading) {
    return <p>Načítavam údaje...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            ←
          </button>
          <h1 className={styles.title}>História Dochádzky</h1>
        </div>
        <div className={styles.courseInfo}>
          <p>Pondelok 7:30 - 9:00</p>
          <p>Miroslav Binas</p>
          <p>L9-B 527 (Kronos)</p>
        </div>
      </header>

      <div className={styles.divider}></div>

      <div className={styles.historyList}>
        {weeks.length === 0 ? (
          <p className="infoMessage">Nie sú žiadne histórie dochádzky.</p>
        ) : (
          weeks.map((week) => (
            <div
              key={week}
              className={styles.historyItem}
              onClick={() => handleViewWeek(week)}
            >
              <span>Týždeň {week}</span>
              <button className={styles.historyArrow}>➡️</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AttendanceHistoryPage;
