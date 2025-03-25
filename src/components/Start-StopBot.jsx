 import { useState } from "react";
 import axios from "axios";
 export default function Start_Stop_Bot (){
    const [botStatus, setBotStatus] = useState("⛔ The bot is stopped");
      const [botActive, setBotActive] = useState(false);
      // ✅ تشغيل البوت
  const handleStartBot = async () => {
    setBotActive(true);
    setBotStatus("✅ The bot is activated");
    try {
      await axios.post("http://localhost:5000/api/set-bot-status", { botActive: true });
    } catch (error) {
      console.error("❌ فشل في تشغيل البوت:", error);
    }
  };
  
  // ⏹️ إيقاف البوت
  const handleStopBot = async () => {
    setBotActive(false);
    setBotStatus("⛔ The bot is stopped ");
    try {
      await axios.post("http://localhost:5000/api/set-bot-status", { botActive: false });
    } catch (error) {
      console.error("❌ فشل في إيقاف البوت:", error);
    }
  };
    return(
        <>
          <h2 className="text-center mb-4 mt-5">Welcome To Bot Control</h2>
          <div className="text-center mb-3">
            <h5>{botStatus}</h5>
          </div>
          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-success" onClick={handleStartBot} disabled={botActive}>▶️ Run the bot</button>
            <button className="btn btn-danger" onClick={handleStopBot} disabled={!botActive}>⏹️ Stop the bot</button>
          </div>
        </>
    )
}