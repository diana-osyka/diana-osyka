import API_BASE_URL from "../config/apiConfig";

const attendanceService = {
  /**
   * Fetch the current week number from the backend.
   * Endpoint: /get_current_week
   */
  async getCurrentWeek() {
    try {
      const response = await fetch(`${API_BASE_URL}/get_current_week`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error fetching current week: ${response.statusText}`);
      }

      const currentWeek = await response.json(); // Assuming backend returns a plain number
      return currentWeek; // e.g., 5
    } catch (error) {
      console.error("Failed to fetch the current week:", error);
      throw error;
    }
  },
};

export default attendanceService;
