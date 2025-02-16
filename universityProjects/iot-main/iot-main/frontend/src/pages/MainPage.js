import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import courseService from "../services/courseService";
import styles from "../styles/MainPage.module.css";

const MainPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const fetchedCourses = await courseService.fetchCourses();
        setCourses(fetchedCourses);
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/details/${id}`);
  };

  const handleAddCourseClick = () => {
    navigate("/create-course");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>📚 Predmety</h1>
        <div className={styles.icons}>
          <button className={styles.icon}>🔍</button>
          <button
            className={styles.icon}
            onClick={handleAddCourseClick}
          >
            ➕
          </button>
        </div>
      </header>
      <div className={styles.cardList}>
        {loading ? (
          <p>Načítavam predmety...</p>
        ) : error ? (
          <p>{error}</p>
        ) : courses.length === 0 ? (
          <p>Nie sú žiadne predmety.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className={styles.card}
              onClick={() => handleCardClick(course.id)}
            >
              <span className={styles.cardText}>{course.name}</span>
              <button className={styles.cardArrow}>➡️</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MainPage;
