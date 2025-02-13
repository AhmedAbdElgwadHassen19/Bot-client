/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [prompt, setPrompt] = useState(""); 
  const [model, setModel] = useState(""); 
  const [message, setMessage] = useState("");
  const [botStatus, setBotStatus] = useState("⛔ البوت متوقف");
  const [botActive, setBotActive] = useState(false);

  // ✅ إرسال الموديل عند تغييره فقط
  const handleModelChange = async (e) => {
    const newModel = e.target.value;
    setModel(newModel);
    console.log(`📌 موديل جديد مختار: ${newModel}`);

    try {
      const response = await axios.post("bots-api-production.up.railway.app/api/set-model", { model: newModel });
      console.log(`✅ تم إرسال الموديل للباك إند بنجاح: ${response.data.message}`);
    } catch (error) {
      console.error("❌ فشل في إرسال الموديل للباك إند:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setMessage("⚠️ الرجاء إدخال البرومبت أولًا.");
      return;
    }

    console.log("📩 إرسال البرومبت:", prompt);

    setMessage("⏳ جاري إرسال البرومبت...");
    
    try {
      await axios.post("bots-api-production.up.railway.app/api/send-prompt",  
        { prompt },  
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("✅ تم إرسال البرومبت بنجاح!");
      setBotActive(true);
      setBotStatus("✅ البوت مفعل");
    } catch (error) {
      setMessage("❌ حدث خطأ أثناء إرسال البرومبت.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🤖 تحكم في البوت</h2>

      <div className="form-group">
        <label className="fw-bold">🔍 اختر الموديل:</label>
        <select className="form-control" value={model} onChange={handleModelChange}>
          <option value="">اختر الموديل</option>
          <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
          <option value="gemini-1.5-ultra">Gemini 1.5 Ultra</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group">
          <label className="fw-bold">📝 أدخل البرومبت:</label>
          <textarea 
            className="form-control border-primary" 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            rows="3"
            placeholder="اكتب البرومبت هنا..."
            style={{ resize: "none", fontSize: "16px", padding: "10px" }}>
          </textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          🚀 إرسال البرومبت
        </button>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default App;
