import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar";
import Register from "./components/Register/Register";
import Checkout from "./components/Checkout/Checkout";
import Footer from "./components/Footer/Footer";
import ThankYou from "./components/thankyou/thankyou";
import AboutUs from "./components/Aboutus/aboutus.jsx";
import Contact from "./components/Contactus/contactus";
import Mentorship from "./components/Mentorships/Mentorship";
import TestSeries from "./components/Testseries/TestSeries";
import JobList from "./components/Job/Jobpost"
import JobForm from "./components/JobPost/Jobpost"
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy.jsx";
import Can_Ref from "./components/Canc&Ref/CanRef.jsx";
import Terms from "./components/T&C/T&C.jsx";
import Resources from "./components/Resources/Resources.jsx";
import FreeResources from "./components/Resources/FreeResources.jsx";


export default function App() {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <div className="mt-[72px]">

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              toastClassName={() =>
                "bg-white text-gray-800 shadow-lg rounded-lg px-4 py-3 border border-gray-300"
              }
              bodyClassName={() =>
                "text-sm font-medium"
              }
              progressClassName="bg-blue-500"
            />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<Products />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/thankyou" element={<ThankYou />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/mentorship" element={<Mentorship />} />
              <Route path="/testseries" element={<TestSeries />} />
              <Route path="/job" element={<JobList />} />
              <Route path="/job_post" element={<JobForm />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/Refund" element={<Can_Ref />} />
              <Route path="/Terms" element={<Terms />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/free_resources" element={<FreeResources />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </>
  );
}
