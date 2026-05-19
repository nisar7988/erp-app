import apiClient from "./apiClient";
export const aiService = {
  async askAI(question: string): Promise<string> {
    try {
      const response = await apiClient.get(`/ai?q=${question}`);
      return response.data.data.response;
    } catch (error: any) {
      console.error("Error asking AI:", error.message);
      return "I'm having trouble connecting right now.";
    }
  },
};
