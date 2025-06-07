import axios from "axios";

const generateImage = async (prompt) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY; // Store securely
  const response = await axios.post(
  "https://api.openai.com/v1/images/generations",
  {
    prompt: "A panda surfing a rocket", // Must be a string
    n: 1,
    size: "512x512",
  },
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  }
  );
  return response.data.data[0].url;
};

export default generateImage;
