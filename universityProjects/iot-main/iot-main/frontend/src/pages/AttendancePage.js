import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import attendanceService from "../services/attendanceService";
import courseService from "../services/courseService";
import styles from "../styles/AttendancePage.module.css";

const AttendancePage = () => {
  const navigate = useNavigate();
  const { subject_id, lessonId, studentIdRaw } = useParams(); // Extract all parameters

  const [attendance, setAttendance] = useState([]);
  const [absenceCount, setAbsenceCount] = useState(0);
  const [courseName, setCourseName] = useState("");
  const [lessonDetails, setLessonDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const course = await courseService.getCourseById(subject_id);
        const lessons = await courseService.fetchLessonsByCourse(subject_id);
        const lesson = lessons.find((lesson) => lesson.id === lessonId);
        setCourseName(course || "Neznámy názov predmetu");
        setLessonDetails(lesson || {});

        const data = await attendanceService.getAttendance(lessonId, studentIdRaw);
        if (data) {
          const [absences, totalAbsences] = data; // Backend returns [absences, totalCount]
          const fullAttendanceList = new Array(7).fill(-1);

          for (let i = 0; i < fullAttendanceList.length; i++) {
            if (absences.includes(i + 1)) {
              fullAttendanceList[i] = 0; // Absent
            } else {
              fullAttendanceList[i] = 1; // Present
            }
          }
          
          console.log(fullAttendanceList);
          
          setAttendance(fullAttendanceList);
          setAbsenceCount(totalAbsences);
      
        } else {
          setAttendance(null);
          setAbsenceCount(null);
        }
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subject_id, lessonId, studentIdRaw]);

  if (loading) {
    return <p>Načítavam údaje...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            ←
          </button>
          <span className={styles.studentIdRaw}>{studentIdRaw}</span>
        </div>
        <div className={styles.courseInfo}>
          <h1>{courseName}</h1>
          <p>
            {lessonDetails.day || "Neznámy deň"}{" "}
            {lessonDetails.start_time || "Neznámy čas"} -{" "}
            {lessonDetails.end_time || "Neznámy čas"}
          </p>
          <p>{lessonDetails.teacher || "Neznámy učiteľ"}</p>
          <p>{lessonDetails.lab || "Neznáma miestnosť"}</p>
        </div>
        {absenceCount|| absenceCount === 0? <div className={styles.absenceSummary}>
          <div className={absenceCount > 1?styles.absenceBadge:styles.goodBadge}>
              {absenceCount}
              <span>absencie</span>
            </div>
          </div>
          :
          <div></div>
        }
      </header>
{console.log(absenceCount)}
      {absenceCount || absenceCount === 0?(attendance.length === 0?
          <div>
            <p className="infoMessage">Žiadne údaje o dochádzke neboli zaznamenané.</p>
          </div>
        : 
          (
          <div className={styles.attendanceList}>
            {attendance.map((week, index) => (
              <div key={index} className={styles.attendanceItem}>
                <span>Týždeň {index + 1}</span>
                {week === 0?
                <span className={styles.absent}> Absencia</span>:
                <span className={styles.present}>Pritomny</span>}
              </div>
            ))}
          </div>
          )
        )
        :    
        (
        <div>
          <p className="infoMessage">Študent s týmto ID nebol nájdený.</p>
        </div>
        )    
        
      }
    </div>
  );
};

export default AttendancePage;
