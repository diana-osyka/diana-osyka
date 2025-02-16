import API_BASE_URL from "../config/apiConfig";

const courseService = {
  // Fetch all courses
  async fetchCourses() {
    try {
      const response = await fetch(`${API_BASE_URL}/get-subjects`);
      if (!response.ok) {
        throw new Error(`Error fetching courses: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      throw error;
    }
  },

  // Fetch a specific course by ID
  async getCourseById(subjectId) {
    try {
      const response = await fetch(`${API_BASE_URL}/get-subjects-name/${subjectId}`);
      if (!response.ok) {
        throw new Error(`Error fetching course by ID: ${response.statusText}`);
      }
      // console.log(response);
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch course by ID:", error);
      throw error;
    }
  },

  // Add a new course
  async addCourse(courseData) {
    try {
      const response = await fetch(`${API_BASE_URL}/add-subject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });
  
      console.log(courseData);
      if (!response.ok) {
        const errorResponse = await response.json(); // Read the response once
        throw new Error(errorResponse.error || `Error adding course: ${response.statusText}`);
      }
  
      return await response.json(); // Read response for successful requests
    } catch (error) {
      console.error("Failed to add course:", error);
      throw error;
    }
  },  

  // Fetch lessons for a specific course
  async fetchLessonsByCourse(subjectId) {
    try {
      const response = await fetch(`${API_BASE_URL}/get-lessons/${subjectId}`);
      if (!response.ok) {
        throw new Error(`Error fetching lessons for course: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch lessons:", error);
      throw error;
    }
  },

  // Verify a course's password
  async verifyCoursePassword(subjectId, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-password/${subjectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        throw new Error(`Error verifying course password: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to verify course password:", error);
      throw error;
    }
  },

  // Check absence data for a student in a specific lesson
  async checkIsicId(lessonId, isicId) {
    try {
      const response = await fetch(`${API_BASE_URL}/check-isic-id/${lessonId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isic_id: isicId }),
      });
      if (!response.ok) {
        throw new Error(`Error checking ISIC ID: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to check ISIC ID:", error);
      throw error;
    }
  },

  // Create an Excel file for a specific lesson
  async createExcelForLesson(lessonId) {
    try {
      const response = await fetch(`${API_BASE_URL}/create-excel/${lessonId}`);
      if (!response.ok) {
        throw new Error(`Error creating Excel file for lesson: ${response.statusText}`);
      }
      return await response.json(); // Adjust based on backend response
    } catch (error) {
      console.error("Failed to create Excel file for lesson:", error);
      throw error;
    }
  },
};

export default courseService;
