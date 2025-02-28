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
      setMessage("❌ الرجاء إدخال برومبت صحيح وإرسال التوكنات أولًا.");
      return;
    }

    setMessage("⏳ جاري إرسال البيانات...");

    try {
      await axios.post("https://bots-api-production.up.railway.app/api/send-prompt", { 
        prompt, 
        inputTokens: parseInt(inputTokens), 
        outputTokens: parseInt(outputTokens) 
      });

      setMessage("✅ تم إرسال البرومبت بنجاح!");
    } catch (error) {
      console.error("❌ خطأ أثناء الإرسال:", error);
      setMessage("❌ حدث خطأ أثناء إرسال البيانات.");
    }
  };

  return (
    <div className="container">

      <div className="form-group mt-3">
        <label className="fw-bold">📝 أدخل البرومبت:</label>
        <textarea 
          className="form-control border-primary" 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          rows="3" 
          placeholder="اكتب البرومبت هنا..." 
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary w-100 mt-3" onClick={handleSubmit}>
        🚀 إرسال جميع البيانات
      </button>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default PromptPage;
