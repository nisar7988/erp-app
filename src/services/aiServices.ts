import apiClient, { API_BASE_URL } from "./apiClient";
import { useAuthStore } from "../store/authStore";

function parseSSE(text: string): string {
  const lines = text.split("\n");
  let result = "";
  for (const line of lines) {
    if (line.startsWith("data: ")) {
      const dataContent = line.substring(6).trim();
      if (!dataContent) continue;
      try {
        const parsed = JSON.parse(dataContent);
        result += parsed;
      } catch {
        // Skip parsing of incomplete chunks until they are fully received
      }
    }
  }
  return result;
}

export const aiService = {
  async askAI(question: string): Promise<string> {
    try {
      const response = await apiClient.get(`/ai?q=${question}`);
      return response.data.data.response;
    } catch (error: any) {
      return error.message;
    }
  },

  streamAI(
    question: string,
    onChunk: (text: string) => void,
    onComplete: () => void,
    onError: (error: any) => void
  ): XMLHttpRequest {
    const xhr = new XMLHttpRequest();
    const token = useAuthStore.getState().accessToken;
    
    const url = `${API_BASE_URL}/ai/stream?q=${encodeURIComponent(question)}`;
    xhr.open("GET", url);
    
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 3 || xhr.readyState === 4) {
        // Parse the accumulated SSE text
        const parsedText = parseSSE(xhr.responseText);
        onChunk(parsedText);
      }
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          onComplete();
        } else {
          onError(new Error(`Request failed with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = (err) => {
      onError(err);
    };

    xhr.send();
    return xhr;
  }
};
