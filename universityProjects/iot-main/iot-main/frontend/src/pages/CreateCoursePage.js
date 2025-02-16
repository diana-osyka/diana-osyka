import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import courseService from "../services/courseService";
import styles from "../styles/CreateCoursePage.module.css";

const CreateCoursePage = () => {
  const navigate = useNavigate();

  const [courseName, setCourseName] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [coursePassword, setCoursePassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!courseName.trim()) {
      newErrors.courseName = "Názov predmetu nemôže byť prázdny.";
    } else if (courseName.length > 40) {
      newErrors.courseName = "Názov predmetu musí byť kratší ako 40 znakov.";
    }

    if (!year) {
      newErrors.year = "Musíte vybrať rok.";
    }

    if (!semester) {
      newErrors.semester = "Musíte vybrať semester.";
    }

    if (!coursePassword.trim()) {
      newErrors.coursePassword = "Heslo nemôže byť prázdne.";
    } else if (coursePassword.length > 40) {
      newErrors.coursePassword = "Heslo musí byť kratšie ako 40 znakov.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateInputs();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const courseData = {
          name: courseName,
          period: year,
          semester: semester,
          password: coursePassword,
        };

        // Call the service to add the course
        await courseService.addCourse(courseData);
        navigate("/"); // Navigate to the main page after success
      } catch (error) {
        console.error("Error adding course:", error);
        setErrors({ apiError: "Nepodarilo sa pridať predmet. Skúste znova." });
      }
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>📚 Vytvorenie predmetu</h1>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Uvedzte nazov predmetu</label>
        <input
          type="text"
          placeholder="NazovSiete"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className={`${styles.input} ${errors.courseName ? styles.errorInput : ""}`}
        />
        {errors.courseName && <p className="error">{errors.courseName}</p>}

        <label className={styles.label}>Uvedzte obdobie predmetu</label>
        <div className={styles.dropdownContainer}>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={`${styles.dropdown} ${errors.year ? styles.errorInput : ""}`}
          >
            <option value="" disabled>
              Rok
            </option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
          {errors.year && <p className="error">{errors.year}</p>}
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className={`${styles.dropdown} ${errors.semester ? styles.errorInput : ""}`}
          >
            <option value="" disabled>
              Semester
            </option>
            <option value="ZS">ZS</option>
            <option value="LS">LS</option>
          </select>
          {errors.semester && <p className="error">{errors.semester}</p>}
        </div>

        <label className={styles.label}>Uvedzte heslo ku predmetu</label>
        <input
          type="password"
          placeholder="******************"
          value={coursePassword}
          onChange={(e) => setCoursePassword(e.target.value)}
          className={`${styles.input} ${errors.coursePassword ? styles.errorInput : ""}`}
        />
        {errors.coursePassword && <p className="error">{errors.coursePassword}</p>}

        {errors.apiError && <p className="error">{errors.apiError}</p>}

        <div className={styles.buttonContainer}>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>
            Zrušiť
          </button>
          <button type="submit" className={styles.submitButton}>
            Pridať predmet
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCoursePage;
