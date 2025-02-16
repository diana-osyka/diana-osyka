import React, { useState } from "react";
import styles from "../styles/AttendanceList.module.css";
import EditAttendancePopup from "./EditAttendancePopup";

const AttendanceList = ({ data, onUpdate }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (item) => {
    setSelectedRow(item);
  };

  const handleClosePopup = () => {
    setSelectedRow(null);
  };

  const handleSavePopup = (updatedItem) => {
    onUpdate(updatedItem);
    setSelectedRow(null);
  };

  return (
    <>
      <div className={styles.attendanceList}>
        {data.map((item, index) => (
          <div
            key={index}
            className={styles.attendanceItem}
            onClick={() => handleRowClick(item)}
          >
            <span>{item.name}</span>
            <span
              className={
                item.status === "Pritomny"
                  ? styles.present
                  : styles.absent
              }
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
      {selectedRow && (
        <EditAttendancePopup
          data={selectedRow}
          onClose={handleClosePopup}
          onSave={handleSavePopup}
        />
      )}
    </>
  );
};

export default AttendanceList;
