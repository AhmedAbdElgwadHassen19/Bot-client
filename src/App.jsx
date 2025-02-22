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

  // ✅ تشغيل البوت
  const handleStartBot = async () => {
    setBotActive(true);
    setBotStatus("✅ البوت مفعل");
  
    try {
      await axios.post("https://bots-api-production.up.railway.app/api/set-bot-status", { botActive: true });
    } catch (error) {
      console.error("❌ فشل في تشغيل البوت:", error);
    }
  };
  
  const handleStopBot = async () => {
    setBotActive(false);
    setBotStatus("⛔ البوت متوقف");
  
    try {
      await axios.post("https://bots-api-production.up.railway.app/api/set-bot-status", { botActive: false });
    } catch (error) {
      console.error("❌ فشل في إيقاف البوت:", error);
    }
  };
  
  
  

  // ✅ تغيير الموديل
  const handleModelChange = async (e) => {
    const newModel = e.target.value;
    setModel(newModel);
    console.log(`📌 موديل جديد مختار: ${newModel}`);
  
    try {
      const response = await axios.post("https://bots-api-production.up.railway.app/api/set-model", { model: newModel });
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
      await axios.post("https://bots-api-production.up.railway.app/api/send-prompt",  
        { prompt, botActive },  
        { headers: { "Content-Type": "application/json" } }
      );
  
      setMessage("✅ تم إرسال البرومبت بنجاح!");
    } catch (error) {
      setMessage("❌ حدث خطأ أثناء إرسال البرومبت.");
    }
  };

  
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🤖 تحكم في البوت</h2>

      <div className="text-center mb-3">
        <h5>{botStatus}</h5>
      </div>

      <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-success" onClick={handleStartBot} disabled={botActive}>
          ▶️ تشغيل البوت
        </button>
        <button className="btn btn-danger" onClick={handleStopBot} disabled={!botActive}>
          ⏹️ إيقاف البوت
        </button>
      </div>

      <div className="form-group mt-3">
      <label className="fw-bold">🔍 اختر الموديل:</label>
      <select className="form-control" value={model} onChange={handleModelChange} required>
        <option value="">اختر الموديل</option>
        <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
        <option value="gemini-1.0-pro">Gemini 1.0 Pro</option>
        <option value="gemini-1.5-flash">gemini 1.5 flash</option>
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

        <button type="submit" className="btn btn-primary w-100 mt-3" disabled={!botActive || !model }>
          🚀 إرسال البرومبت
        </button>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default App;
