import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PrivacyPolicy from "./PrivacyPolicy";
import { TokenProvider } from "./context/TokenContext"; 
function App() {

  return (
    <TokenProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        </Routes>
      </Router>
    </TokenProvider>
  );
}

export default App;
