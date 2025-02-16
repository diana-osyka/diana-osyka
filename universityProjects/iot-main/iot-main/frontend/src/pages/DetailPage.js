import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import lessonService from "../services/lessonService";
import courseService from "../services/courseService"; // Import the courseService
import styles from "../styles/DetailPage.module.css";

const DetailPage = () => {
  const navigate = useNavigate();
  const { subject_id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseName, setCourseName] = useState(""); // State to store course name

  // Fetch lessons and course name
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lessons, course] = await Promise.all([
          lessonService.getLessons(subject_id),
          courseService.getCourseById(subject_id),
        ]);
        setItems(lessons);
        setCourseName(course);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [subject_id]);

  const handleCardClick = (lessonId) => {
    navigate(`/student-teacher/${subject_id}/${lessonId}`);
  };

  const handleAddLessonClick = () => {
    navigate(`/details/${subject_id}/create-lesson`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerTitle}>
            <button
              className={styles.backButton}
              onClick={() => navigate("/")}
            >
              ←
            </button>
            <h1 className={styles.title}>
              {loading ? "Loading..." : courseName || "Názov neznámy"}
            </h1>
          </div>
          <button
            className={styles.addButton}
            onClick={handleAddLessonClick}
          >
            ➕
          </button>
        </div>
      </header>
      <div className={styles.cardList}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : items.length === 0 ? (
          <p className="infoMessage">Nie sú žiadne hodiny.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={styles.card}
              onClick={() => handleCardClick(item.id)}
            >
              <div className={styles.cardContent}>
                <span className={styles.cardText}>{item.day || "Neznámy deň"} {item.start_time || "Neznámy čas"} - {item.end_time || "Neznámy čas"}</span>
                <span className={styles.cardText}>{item.teacher || "Neznámy učiteľ"}</span>
                <span className={styles.cardText}>{item.lab || "Neznáma miestnosť"}</span>
              </div>
              <button className={styles.cardArrow}>➡️</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DetailPage;
