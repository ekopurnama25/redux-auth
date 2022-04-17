import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LoginPages, HomePages } from "./pages";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/login" element={<LoginPages />} />
      </Routes>
    </div>
  );
}

export default App;
