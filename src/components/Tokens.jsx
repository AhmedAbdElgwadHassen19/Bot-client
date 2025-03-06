import { useContext, useState } from "react";
import axios from "axios";
import { TokenContext } from "../context/TokenContext";

function Tokens() {
  const { setInputTokens, setOutputTokens } = useContext(TokenContext); // ✅ جلب الدوال من الـ Context
  const [localInputTokens, setLocalInputTokens] = useState("");
  const [localOutputTokens, setLocalOutputTokens] = useState("");
  const [message, setMessage] = useState("");

  // ✅ حفظ القيم تلقائيًا في Context عند فقدان التركيز (`onBlur`)
  const handleBlur = async () => {
    const input = parseInt(localInputTokens);
    const output = parseInt(localOutputTokens);

    if (!isNaN(input) && !isNaN(output)) {
      setInputTokens(input);
      setOutputTokens(output);

      try {
        await axios.post("https://bots-api-production.up.railway.app/api/tokens", { inputTokens: input, outputTokens: output });
        setMessage("✅ Values ​​saved and sent automatically!");
      } catch (error) {
        console.error("❌ خطأ أثناء الإرسال:", error);
        setMessage("❌ An error occurred while sending data.");
      }
    }
  };

  return (
    <div className="container ">

      <div className="form-group mt-3">
        <label className="fw-bold mb-2">🔡  Input Tokens:</label>
        <input 
          type="number" 
          className="form-control border-warning" 
          value={localInputTokens} 
          onChange={(e) => setLocalInputTokens(e.target.value)} 
          placeholder="Input Tokens..."
        />
      </div>

      <div className="form-group mt-3">
        <label className="fw-bold mb-2">🔠 Output Tokens:</label>
        <input 
          type="number" 
          className="form-control border-success" 
          value={localOutputTokens} 
          onChange={(e) => setLocalOutputTokens(e.target.value)} 
          onBlur={handleBlur} // ✅ حفظ البيانات تلقائيًا عند فقدان التركيز
          placeholder="Output Tokens..."
        />
      </div>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default Tokens;
