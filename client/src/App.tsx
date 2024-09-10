import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import PackageList from "./components/PackageList";
import PackageDetails from "./components/DetailPackage";
import BookingForm from "./components/BookingForm";
import { Toaster } from "react-hot-toast";
import { store } from "../src/redux/store"; // Import the Redux store

function App() {
  return (
    <Provider store={store}>
      {" "}
      {/* Wrap the app with the Redux Provider */}
      <Toaster /> {/* Toast notifications across the app */}
      <Router>
        <Routes>
          <Route path="/" element={<PackageList />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
