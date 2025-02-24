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
  const [inputTokens, setInputTokens] = useState("");
  const [outputTokens, setOutputTokens] = useState("");

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
  
  // ⏹️ إيقاف البوت
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
      await axios.post("https://bots-api-production.up.railway.app/api/set-model", { model: newModel });
    } catch (error) {
      console.error("❌ فشل في إرسال الموديل للباك إند:", error);
    }
  };

  // ✅ إرسال البيانات مع التحقق من الإدخال
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isNaN(inputTokens) || isNaN(outputTokens)) {
      setMessage("⚠️ الرجاء إدخال جميع الحقول المطلوبة.");
      return;
    }
  
    setMessage("⏳ جاري إرسال البيانات...");
    try {
      console.log("📤 إرسال البيانات إلى الباك إند:", { 
        prompt, 
        inputTokens: parseInt(inputTokens),  
        outputTokens: parseInt(outputTokens) 
      });
  
      const response = await axios.post("https://bots-api-production.up.railway.app/api/send-prompt", { 
        prompt, 
        inputTokens: parseInt(inputTokens),  
        outputTokens: parseInt(outputTokens) 
      });
  
      setMessage("✅ تم إرسال البيانات ومعالجة الاستجابة!");
      console.log("🔹 رد البوت:", response.data.response);
  
    } catch (error) {
      console.error("❌ خطأ أثناء إرسال الطلب:", error);
      setMessage("❌ حدث خطأ أثناء إرسال البيانات.");
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🤖 تحكم في البوت</h2>
      <div className="text-center mb-3">
        <h5>{botStatus}</h5>
      </div>

      <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-success" onClick={handleStartBot} disabled={botActive}>▶️ تشغيل البوت</button>
        <button className="btn btn-danger" onClick={handleStopBot} disabled={!botActive}>⏹️ إيقاف البوت</button>
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

      <div className="form-group mt-3">
        <label className="fw-bold">📝 أدخل البرومبت:</label>
        <textarea className="form-control border-primary" value={prompt} onChange={(e) => setPrompt(e.target.value)} rows="3" placeholder="اكتب البرومبت هنا..." style={{ resize: "none", fontSize: "16px", padding: "10px" , height:"15rem"}}></textarea>
      </div>

      <div className="form-group mt-3">
  <label className="fw-bold">🔡 عدد الـ Input Tokens:</label>
  <input 
    type="number" 
    className="form-control border-warning" 
    value={inputTokens} 
    onChange={(e) => setInputTokens(e.target.value ? parseInt(e.target.value) : "")} 
    placeholder="Input Tokens..."
  />
</div>

      <div className="form-group mt-3">
  <label className="fw-bold">🔠 عدد الـ Output Tokens:</label>
  <input 
    type="number" 
    className="form-control border-success" 
    value={outputTokens} 
    onChange={(e) => setOutputTokens(e.target.value ? parseInt(e.target.value) : "")} 
    placeholder="Output Tokens..."
  />
</div>

      <button 
  type="submit" 
  className="btn btn-primary w-100 mt-3" 
  onClick={handleSubmit} 
  disabled={isNaN(inputTokens) || isNaN(outputTokens) || !prompt.trim()}>
  🚀 إرسال البيانات
</button>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default App;
