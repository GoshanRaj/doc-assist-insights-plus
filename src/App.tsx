
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Doctors from "./pages/Doctors";
import Services from "./pages/Services";
import HealthTips from "./pages/HealthTips";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/services" element={<Services />} />
        <Route path="/health" element={<HealthTips />} />
        <Route path="/book" element={<BookAppointmentPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

