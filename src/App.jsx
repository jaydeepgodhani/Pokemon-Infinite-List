import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Pokemon from "./Pokemon";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pokemon/:name" element={<Pokemon />} />
      </Routes>
    </>
  );
}

export default App;
