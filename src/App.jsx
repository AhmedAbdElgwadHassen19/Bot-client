/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import { TokenProvider } from "./context/TokenContext"; 
function App() {
  const [model, setModel] = useState(""); 
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

  return (
    <TokenProvider>
    <div className="container mt-5">
      
      <Router>
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
  <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
  <option value="gemini-2.0-flash-lite-001">Gemini 2.0 Flash-lite </option>
  <option value="gemini-2.0-flash-001">Gemini 2.0 Flash </option>
</select>

      </div>
    
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    
    </div>
    </TokenProvider>
      
  );
}

export default App;
