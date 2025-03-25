/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";

export default function UploadImage() {
    const [file, setFile] = useState(null);
    const [productName, setProductName] = useState("");
    const [message, setMessage] = useState("");

    const handleUpload = async () => {
        if (!file || !productName) {
            setMessage("❌ الرجاء اختيار صورة وإدخال اسم المنتج.");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        formData.append("product_name", productName);

        console.log("📤 البيانات المرسلة إلى السيرفر:", [...formData]);
        setMessage("⏳ جاري رفع الصورة...");

        try {
            const response = await axios.post("http://localhost:5000/api/upload-image", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log("✅ استجابة السيرفر:", response.data);
            setMessage(`✅ تم رفع الصورة بنجاح! الرابط: ${response.data.imageUrl}`);
        } catch (error) {
            console.error("❌ خطأ أثناء رفع الصورة:", error.response ? error.response.data : error.message);
            setMessage("❌ حدث خطأ أثناء رفع الصورة. تحقق من السيرفر.");
        }
    };

    return (
        <div className="container mt-5">
            <input
                type="text"
                placeholder="📝 Enter the product name"  
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="form-control border-dark  mb-3 text-center"
            />
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="form-control border-dark mb-3"
            />
            <button onClick={handleUpload} className="btn btn-primary  ">
                📤 Upload the image
            </button>
        </div>
    );
}
