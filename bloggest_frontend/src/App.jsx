import "./App.css";
import { Routes, Route } from "react-router-dom";
import Editor from "./pages/Editor/Editor";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Dashboard />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/editor/:blog" element={<Editor />} />
      <Route path="*" element={<h1>NO PAGES FOUND</h1>} />
    </Routes>
  );
}

export default App;
