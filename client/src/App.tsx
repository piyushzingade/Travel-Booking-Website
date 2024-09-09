import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PackageList from "./components/PackageList";
import PackageDetails from "./components/PackageDetails";
import BookingForm from "./components/BookingForm";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PackageList />} />
        <Route path="/packages/:id" element={<PackageDetails />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="*" element={<div>404 Not Found</div>} />{" "}
        {/* Handle unknown routes */}
      </Routes>
    </Router>
  );
}

export default App;
