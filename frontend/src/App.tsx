// App.tsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PackagePage from "./pages/PackagePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/package/:id" element={<PackagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
