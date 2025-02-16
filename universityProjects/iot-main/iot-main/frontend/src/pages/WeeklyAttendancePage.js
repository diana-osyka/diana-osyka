import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AttendanceList from "./AttendanceList";
import styles from "../styles/WeeklyAttendancePage.module.css";

const WeeklyAttendancePage = () => {
  const navigate = useNavigate();
  const { weekId } = useParams();

  const [attendanceData, setAttendanceData] = useState([]); // Empty array for testing no attendance scenario

  const totalPeople = attendanceData.length;

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
        <div className={styles.headerRow}>
          <button
            className={styles.backButton}
            onClick={() => navigate(-1)}
          >
            ←
          </button>
          <h1 className={styles.title}>Internet veci</h1>
        </div>
        <p className={styles.courseInfo}>Pondelok 7:30 - 9:00</p>
        <p className={styles.courseInfo}>L9-B 527 (Kronos)</p>
        <div className={styles.absenceSummary}>
          <div className={styles.absenceBadge}>
            <span>{weekId}</span>
            <span>tyzden</span>
          </div>
        </div>
      </header>

      <div className={styles.divider}></div>

      {/* Attendance Info */}
      <div className={styles.attendanceInfo}>
        <p>aktualizovane: 7:51 14.09.25</p>
        <p>Pocet ludi: {totalPeople}</p>
      </div>

      {/* Attendance List */}
      {attendanceData.length === 0 ? (
        <p class="infoMessage">Nie sú žiadne údaje o dochádzke.</p>
      ) : (
        <AttendanceList data={attendanceData} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default WeeklyAttendancePage;
