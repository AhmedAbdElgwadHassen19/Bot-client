import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { TokenProvider } from "./context/TokenContext"; 
function App() {

  return (
    <TokenProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </TokenProvider>
  );
}

export default App;
