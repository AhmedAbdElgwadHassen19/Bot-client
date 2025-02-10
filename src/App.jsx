import { useState } from "react";
import axios from "axios";
import PrivacyPolicy from "./PrivacyPolicy";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  const [prompt, setPrompt] = useState(""); 
  const [message, setMessage] = useState("");

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ جاري إرسال البرومبت...");

    try {
      await axios.post("https://bots-api-production.up.railway.app/api/send-prompt",  // ✅ تغيير المسار الصحيح
        { prompt }, 
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("✅ تم تحديث معلومات Gemini بنجاح!");
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error);
      setMessage("❌ حدث خطأ أثناء تحديث Gemini");
    }
  };

  return (
    <>
      <div className="container">
      <h2>🎤 أرسل برومبت إلى Gemini</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="prompt">📝 أدخل البرومبت:</label>
          <textarea id="prompt" className="form-control" value={prompt} onChange={handlePromptChange} rows="3"></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">🚀 إرسال البرومبت</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>


    <Router>
      <Routes>
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
