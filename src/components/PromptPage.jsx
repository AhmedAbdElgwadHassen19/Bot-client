import { useState, useContext } from "react";
import axios from "axios";
import { TokenContext } from "../context/TokenContext"; // ✅ استيراد الـ Context لحفظ التوكنات

function PromptPage() {
  const { inputTokens, outputTokens } = useContext(TokenContext); // ✅ جلب القيم المخزنة في `Context`
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim() || isNaN(parseInt(inputTokens)) || isNaN(parseInt(outputTokens))) {
      setMessage("❌ Please enter a valid prompt and send the tokens first.");
      return;
    }

    setMessage("⏳ Sending data...");

    try {
      await axios.post("https://bots-api-production.up.railway.app/api/send-prompt", { 
        prompt, 
        inputTokens: parseInt(inputTokens), 
        outputTokens: parseInt(outputTokens) 
      });

      setMessage("✅ The prompt has been sent successfully");
    } catch (error) {
      console.error("❌ خطأ أثناء الإرسال:", error);
      setMessage("❌ An error occurred while sending data.");
    }
  };

  return (
    <div className="container">

      <div className="form-group mt-3">
        <label className="fw-bold">📝 Enter the prompt</label>
        <textarea 
          className="form-control border-primary" 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          rows="3" 
          placeholder="Write the prompt here..." 
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary w-100 mt-3" onClick={handleSubmit}>
        🚀 Submit all data
      </button>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default PromptPage;
