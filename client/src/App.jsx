import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure this is imported
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home"

export default function App() {
  return (
    <>
      <Router>
        <div className="">
          <Navbar />

          <div className="mt-[72px]">
            <Home />
          </div>

        </div>

        <Footer />
      </Router>
    </>
  );
}
