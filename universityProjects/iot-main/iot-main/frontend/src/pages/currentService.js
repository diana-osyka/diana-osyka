import API_BASE_URL from "../config/apiConfig";

const currentService = {
  /**
   * Fetch the current week data from the backend.
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

      const data = await response.json();
      return data; // Assuming the backend returns the current week as JSON
    } catch (error) {
      console.error("Failed to fetch current week:", error);
      throw error;
    }
  },
};

export default currentService;
