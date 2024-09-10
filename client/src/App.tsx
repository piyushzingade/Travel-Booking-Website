
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "../src/redux/store"; // Import the Redux store

import HomePage from "./pages/HomePage";
import PackagePage from "./pages/PackagePage";
import BookingPage from "./pages/BookingPage";

function App() {
  return (
    <Provider store={store}>
      <Toaster /> {/* Toast notifications across the app */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/packages/:id" element={<PackagePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
