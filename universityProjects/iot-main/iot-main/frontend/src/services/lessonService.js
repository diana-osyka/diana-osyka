import API_BASE_URL from "../config/apiConfig";

const lessonService = {
  // Fetch lessons for a specific subject
  async getLessons(subjectId) {
    try {
      const response = await fetch(`${API_BASE_URL}/get-lessons/${subjectId}`);
      if (!response.ok) {
        throw new Error(`Error fetching lessons: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Add a new lesson
  async addLesson(lessonData) {
    try {
      const response = await fetch(`${API_BASE_URL}/add-lesson/${lessonData.subject_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lessonData),
      });
      console.log(lessonData);
      if (!response.ok) {
        throw new Error(`Error adding lesson: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default lessonService;