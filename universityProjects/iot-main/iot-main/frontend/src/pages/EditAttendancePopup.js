import React from "react";
import styles from "../styles/EditAttendancePopup.module.css";

const EditAttendancePopup = ({ data, onClose, onSave }) => {
  const [status, setStatus] = React.useState(data.status);

  const handleSave = () => {
    onSave({ ...data, status });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2 className={styles.name}>{data.name}</h2>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.dropdown}
        >
          <option value="Pritomny" className={styles.present}>
            Pritomny
          </option>
          <option value="Absencia" className={styles.absent}>
            Absencia
          </option>
        </select>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Zrušiť
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            Redagovat
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAttendancePopup;
