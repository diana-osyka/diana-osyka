import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import lessonService from "../services/lessonService";
import styles from "../styles/CreateLessonPage.module.css";

const CreateLessonPage = () => {
  const navigate = useNavigate();

  const { subject_id } = useParams();
  const [location, setLocation] = useState("dd");
  const [day, setDay] = useState("");
  const [timeFrom, setTimeFrom] = useState("6:00");
  const [timeTo, setTimeTo] = useState("7:00");
  const [teacherName, setTeacherName] = useState("dd");
  const [teacherEmail, setTeacherEmail] = useState("dd@gmail.com");
  const [excelFile, setExcelFile] = useState(null);

  const [errors, setErrors] = useState({});

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!location.trim()) {
      newErrors.location = "Miestnosť musí byť zadaná.";
    } else if (location.length > 40) {
      newErrors.location = "Miestnosť musí byť kratšia ako 40 znakov.";
    }

    if (!day.trim()) {
      newErrors.day = "Deň musí byť vybraný.";
    }

    if (!timeFrom.trim()) {
      newErrors.timeFrom = "Čas od musí byť vybraný.";
    }

    if (!timeTo.trim()) {
      newErrors.timeTo = "Čas do musí byť vybraný.";
    }

    // Convert times to minutes and check if "Čas Od" is earlier than "Čas Do"
    if (timeFrom && timeTo) {
      const timeFromMinutes = convertTimeToMinutes(timeFrom);
      const timeToMinutes = convertTimeToMinutes(timeTo);

      if (timeFromMinutes >= timeToMinutes) {
        newErrors.timeTo = "Čas do musí byť neskôr ako čas od.";
      }
    }

    if (!teacherName.trim()) {
      newErrors.teacherName = "Meno učiteľa musí byť zadané.";
    } else if (teacherName.length > 40) {
      newErrors.teacherName = "Meno učiteľa musí byť kratšie ako 40 znakov.";
    }

    if (!excelFile) {
      newErrors.excelFile = "Musíte nahrať Excel súbor.";
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
        const lessonData = {
          subject_id,
          start_time: timeFrom,
          end_time: timeTo,
          day,
          lab: location,
          teacher: teacherName,
          email: teacherEmail,
          excelFile,
        };

        await lessonService.addLesson(lessonData); // Use lessonService to add the lesson
        navigate("/details/" + subject_id); // Navigate to details page
      } catch (error) {
        console.error("Error adding lesson:", error);
        setErrors({ apiError: "Nepodarilo sa pridať hodinu. Skúste znova." });
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setExcelFile(file);
      setErrors((prev) => ({ ...prev, excelFile: "" })); // Clear error if file is added
    }
  };

  const handleFileDelete = () => {
    setExcelFile(null); // Clear the selected file
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>📚 Vytvorenie hodiny</h1>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Location */}
        <label className={styles.label}>Uvedzte miestnosť hodiny</label>
        <input
          type="text"
          placeholder="L9-B 527 (Kronos)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={`${styles.input} ${errors.location ? styles.errorInput : ""}`}
        />
        {errors.location && <p className="error">{errors.location}</p>}

        {/* Day */}
        <label className={styles.label}>Uvedzte deň hodiny</label>
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className={`${styles.dropdown} ${errors.day ? styles.errorInput : ""}`}
        >
          <option value="" disabled>
            Deň
          </option>
          <option value="Pondelok">Pondelok</option>
          <option value="Utorok">Utorok</option>
          <option value="Streda">Streda</option>
          <option value="Štvrtok">Štvrtok</option>
          <option value="Piatok">Piatok</option>
        </select>
        {errors.day && <p className="error">{errors.day}</p>}

        {/* Time */}
        <label className={styles.label}>Uvedzte čas hodiny</label>
        <div className={styles.timeContainer}>
          <select
            value={timeFrom}
            onChange={(e) => setTimeFrom(e.target.value)}
            className={`${styles.dropdown} ${errors.timeFrom ? styles.errorInput : ""}`}
          >
            <option value="" disabled>
              Od
            </option>
            <option value="06:45">06:45</option>
            <option value="07:30">07:30</option>
            <option value="08:15">08:15</option>
            <option value="09:10">09:10</option>
            <option value="09:55">09:55</option>
            <option value="10:50">10:50</option>
            <option value="11:35">11:35</option>
            <option value="12:20">12:20</option>
            <option value="13:30">13:30</option>
            <option value="14:15">14:15</option>
            <option value="15:10">15:10</option>
            <option value="15:55">15:55</option>
            <option value="16:50">16:50</option>
            <option value="17:35">17:35</option>
            <option value="18:30">18:30</option>
            <option value="19:15">19:15</option>
          </select>
          {errors.timeFrom && <p className="error">{errors.timeFrom}</p>}
          <select
            value={timeTo}
            onChange={(e) => setTimeTo(e.target.value)}
            className={`${styles.dropdown} ${errors.timeTo ? styles.errorInput : ""}`}
          >
            <option value="" disabled>
              Do
            </option>
            <option value="07:30">07:30</option>
            <option value="08:15">08:15</option>
            <option value="09:00">09:00</option>
            <option value="09:55">09:55</option>
            <option value="10:40">10:40</option>
            <option value="11:35">11:35</option>
            <option value="12:20">12:20</option>
            <option value="13:05">13:05</option>
            <option value="14:15">14:15</option>
            <option value="15:00">15:00</option>
            <option value="15:55">15:55</option>
            <option value="16:40">16:40</option>
            <option value="17:35">17:35</option>
            <option value="18:20">18:20</option>
            <option value="19:15">19:15</option>
            <option value="20:00">20:00</option>
          </select>
          {errors.timeTo && <p className="error">{errors.timeTo}</p>}
        </div>

        {/* Teacher Name */}
        <label className={styles.label}>Uvedzte meno učiteľa</label>
        <input
          type="text"
          placeholder="Meno Učiteľa"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          className={`${styles.input} ${errors.teacherName ? styles.errorInput : ""}`}
        />
        {errors.teacherName && <p className="error">{errors.teacherName}</p>}

        {/* Teacher Email */}
        <label className={styles.label}>Uvedzte email učiteľa (voliteľné)</label>
        <input
          type="email"
          placeholder="ucitel.tuke@ucitel.tuke.sk"
          value={teacherEmail}
          onChange={(e) => setTeacherEmail(e.target.value)}
          className={styles.input}
        />

        {/* Excel File Upload */}
        {!excelFile && (
          <div className={styles.fileWrapper}>
            <label className={styles.label}>Nahrajte Excel súbor</label>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className={`${styles.fileInput} ${errors.excelFile ? styles.errorInput : ""}`}
            />
          </div>
        )}
        {errors.excelFile && <p className="error">{errors.excelFile}</p>}
        {excelFile && (
          <div className={styles.fileInfo}>
            <p>
              Nahratý súbor: <strong>{excelFile.name}</strong>
            </p>
            <button type="button" onClick={handleFileDelete} className={styles.deleteFileButton}>
              Odstrániť súbor
            </button>
          </div>
        )}
        <small className={styles.fileNote}>
          *musí obsahovať stĺpce v poradí: ISIC ID, ID ISIC čipu, mená,
          priezviská a emaily študentov
        </small>

        {errors.apiError && <p className="error">{errors.apiError}</p>}

        {/* Buttons */}
        <div className={styles.buttonContainer}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.cancelButton}
          >
            Zrušiť
          </button>
          <button type="submit" className={styles.submitButton}>
            Pridať hodinu
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLessonPage;
