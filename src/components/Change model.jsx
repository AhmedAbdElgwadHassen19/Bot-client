import axios from "axios";
import { useState } from "react";
export default function ChangeModel() {
    const [model, setModel] = useState(""); 

  // ✅ تغيير الموديل
const handleModelChange = async (e) => {
    const newModel = e.target.value;
    setModel(newModel);
    console.log(`📌 موديل جديد مختار: ${newModel}`);
    try {
        await axios.post("http://localhost:5000/api/set-model", { model: newModel });
    }  catch (error) {
        console.error("❌ فشل في إرسال الموديل للباك إند:", error);
    }
    };
return(
    <>
    <div className="container">
        <div className="form-group mt-3">
        <label className="fw-bold mb-2">🔍 Select the model</label>
        <select className="form-control" value={model} onChange={handleModelChange} required>
            <option value="">Select the model </option>
            <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
            <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
            <option value="gemini-1.5-flash-8b">Gemini 1.5 Flash-8b</option>
            <option value="gemini-2.0-flash-lite-001">Gemini 2.0 Flash-lite </option>
            <option value="gemini-2.0-flash-001">Gemini 2.0 Flash </option>
        </select>
        </div>
    </div>
    </>
)
}