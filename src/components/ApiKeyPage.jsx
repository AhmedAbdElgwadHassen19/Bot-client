import { useState } from "react";
import axios from "axios";

export default function ApiKeyInput() {
    const [apiKey, setApiKey] = useState("");
    const [message, setMessage] = useState("");

    const handleBlur = async () => {
        if (!apiKey) return;

        setMessage("⏳ جاري التحقق من المفتاح...");
        console.log("🔑 المفتاح المُرسل للباك إند:", apiKey); // ✅ تحقق من المفتاح قبل الإرسال

        try {
            // ✅ إرسال المفتاح إلى الباك إند مع `headers` صحيحة
            const response = await axios.post("http://localhost:5000/api/check-api-key", 
                { apiKey }, 
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.valid) {
                setMessage("✅ مفتاح API صالح وتم حفظه بنجاح!");
            } else {
                setMessage("❌ مفتاح API غير صالح، الرجاء إدخال مفتاح صحيح.");
            }

        } catch (error) {
            console.error("❌ خطأ أثناء التحقق:", error.response ? error.response.data : error.message);
            setMessage("❌ مفتاح API غير صالح، الرجاء إدخال مفتاح صحيح.");
        }
    };

    return (
        <div className="container mt-3">
            <div className="form-group-mt-3">
                <label className="block mb-2 font-semibold">🔑Enter API Key</label>
                <input
                    type="text"
                    placeholder="Enter API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    onBlur={handleBlur} // ✅ يتم التحقق تلقائيًا عند مغادرة الحقل
                    className="form-control border-dark"
                />
                <p className={`text-sm ${message.includes("✅") ? "text-green-500" : "text-red-500"}`}>{message}</p>
            </div>
        </div>
    );
}
