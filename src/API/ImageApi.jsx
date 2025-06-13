import axios from "axios";

const generateImage = async (prompt) => {
  const apiKey = import.meta.env.VITE_DEEPAI_API_KEY;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt,
        n: 1,
        size: "512x512",
        model: "dall-e-2", // You can also try "dall-e-3" if your account supports it
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.data[0].url;
  } catch (error) {
    console.error("OpenAI API Error:", error.response?.data || error.message);
    throw error;
  }
};

export default generateImage;
