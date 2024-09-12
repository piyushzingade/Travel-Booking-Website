import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "../src/redux/store"; // Import the Redux store

import HomePage from "./pages/HomePage";
import PackagePage from "./pages/PackagePage";
import BookingPage from "./pages/BookingPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import PackageDetails from "./components/Packages/DetailPackage";
import SignUpPage from "./components/Auth/SignUpPage";
import LoginPage from "./components/Auth/LoginPage";

function App() {
  return (
    <Provider store={store}>
      <Toaster /> {/* Toast notifications across the app */}
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/packages/*"
            element={<ProtectedRoute isAuthenticated={true} />}
          >
            <Route path=":id" element={<PackageDetails />} />
          </Route>
          <Route path="/booking" element={<BookingPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
