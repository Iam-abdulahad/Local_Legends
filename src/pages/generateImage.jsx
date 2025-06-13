// src/components/ImageGenerator.jsx
import React, { useState } from "react";
import generateImage from "../API/ImageApi";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt");
      return;
    }

    setLoading(true);
    console.log("Prompt sent to OpenAI:", prompt);

    try {
      const url = await generateImage(prompt);
      setImageUrl(url);
    } catch (err) {
      // Error already handled in API file
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">AI Image Generator</h1>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt"
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {imageUrl && (
        <div className="mt-6">
          <img src={imageUrl} alt="Generated" className="rounded shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
