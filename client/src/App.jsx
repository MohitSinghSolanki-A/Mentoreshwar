import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar";
import Register from "./components/Register/Register";
import Checkout from "./components/Checkout/Checkout";
import Footer from "./components/Footer/Footer";
import ThankYou from "./components/thankyou/thankyou";
import AboutUs from "./components/aboutus/AboutUs";
import Contact from "./components/Contactus/contactus";
import Mentorship from "./components/Mentorships/Mentorship";
import TestSeries from "./components/Testseries/TestSeries";
import JobList from "./components/Job/Jobpost"
import JobForm from "./components/JobPost/Jobpost"
import Dummy from "./components/Dummy"

export default function App() {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <div className="mt-[72px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<Products />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/thankyou" element={<ThankYou />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/dummy" element={<Dummy />} />
              <Route path="/mentorship" element={<Mentorship />} />
              <Route path="/testseries" element={<TestSeries />} />
              <Route path="/job" element={<JobList />} />
              <Route path="/job_post" element={<JobForm />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </>
  );
}
