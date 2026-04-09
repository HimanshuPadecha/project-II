import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Account from "./Account";
import TrainAvailability from "./TrainAvailability";
import Payment from "./Payment";
import PassengerFare from "./PassengerFare";
import BookingConfirmation from "./BookingConfirmation";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

// Additional Pages
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import FAQ from "./FAQ";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#101522] text-slate-100 font-display">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/train-availability" element={<TrainAvailability />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Guest Only Routes (Not Accessible if logged in) */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestRoute>
                <Signup />
              </GuestRoute>
            }
          />

          {/* Protected Routes (Require Login) */}
          <Route
            path="/passenger-fare"
            element={
              <ProtectedRoute>
                <PassengerFare />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-confirmation"
            element={
              <ProtectedRoute>
                <BookingConfirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
