import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import courseService from "../services/courseService";
import styles from "../styles/StudentTeacherPage.module.css";

const StudentTeacherPage = () => {
  const navigate = useNavigate();
  const { subject_id, lessonId } = useParams(); // Extract parameters from the route

  // States for data
  const [courseName, setCourseName] = useState("");
  const [lessonDetails, setLessonDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for student ID
  const [studentIdFormatted, setStudentIdFormatted] = useState("");
  const [studentIdRaw, setStudentIdRaw] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [studentError, setStudentError] = useState("");
  const [teacherError, setTeacherError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const course = await courseService.getCourseById(subject_id);
        const lessons = await courseService.fetchLessonsByCourse(subject_id);
        const lesson = lessons.find((lesson) => lesson.id === lessonId);
        setCourseName(course);
        setLessonDetails(lesson || {});
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subject_id, lessonId]);

  const handleStudentIdChange = (e) => {
    const input = e.target.value.replace(/\s/g, "").toUpperCase();
    const raw = input.substring(0, 11); // Limit raw input to "S0000000000"
    const formatted = raw
      .replace(/^(.{1})(\d{2})/, "$1 $2") // Add space after "S"
      .replace(/(\d{2})(\d{2})/, "$1 $2") // Add space after second group
      .replace(/(\d{2} \d{2})(\d{2})/, "$1 $2") // Add space after third group
      .replace(/(\d{2} \d{2} \d{2})(\d{2})/, "$1 $2") // Add space after fourth group
      .replace(/(\d{2} \d{2} \d{2} \d{2})(\d{2})/, "$1 $2"); // Add space after the final group

    setStudentIdRaw(raw);
    setStudentIdFormatted(formatted);
    setStudentError("");
  };

  const handleTeacherPasswordChange = (e) => {
    const input = e.target.value;
    if (input.length <= 20) {
      setTeacherPassword(input);
      setTeacherError("");
    }
  };

  const handleSearchStudent = () => {
    if (!studentIdRaw.startsWith("S")) {
      setStudentError("ID musí začínať na 'S'.");
      return;
    }
    if (!studentIdRaw.match(/^S\d{10}$/)) {
      setStudentError("Zadajte správny formát: S 00 00 00 00 00");
    } else {
      navigate(`/attendance/${subject_id}/${lessonId}/${studentIdRaw}`);
    }
  };

  const handleShowStatistics = () => {
    if (teacherPassword.trim() === "") {
      setTeacherError("Pole nesmie byť prázdne.");
    } else {
      // console.log("Viewing statistics for lesson:", lessonId);
      navigate(`/statistics`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
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
          <h1 className={styles.title}>{courseName || "Neznámy názov predmetu"}</h1>
        </div>
        <div className={styles.courseInfo}>
          <p>{lessonDetails.day || "Neznámy deň"} {lessonDetails.start_time || "Neznámy čas"} - {lessonDetails.end_time || "Neznámy čas"}</p>
          <p>{lessonDetails.teacher || "Neznámy učiteľ"}</p>
          <p>{lessonDetails.lab || "Neznáma miestnosť"}</p>
        </div>
      </header>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Pre študentov</h2>
        <label className={styles.label}>Uvedzte číslo študenta</label>
        <input
          type="text"
          value={studentIdFormatted}
          onChange={handleStudentIdChange}
          placeholder="S 00 00 00 00 00"
          className={styles.input}
        />
        {studentError && <p className="error">{studentError}</p>}
        <button className={styles.button} onClick={handleSearchStudent}>
          Vyhľadať podľa čísla
        </button>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Pre učiteľov</h2>
        <label className={styles.label}>Uvedzte heslo predmetu</label>
        <input
          type="password"
          value={teacherPassword}
          onChange={handleTeacherPasswordChange}
          placeholder="******************"
          className={styles.input}
        />
        {teacherError && <p className="error">{teacherError}</p>}
        <button className={styles.button} onClick={handleShowStatistics}>
          Zobraziť štatistiky
        </button>
      </div>
    </div>
  );
};

export default StudentTeacherPage;
