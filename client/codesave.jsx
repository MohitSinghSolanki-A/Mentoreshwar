// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Make sure this is imported

// import "./App.css";
// import Home from "./components/Home/Home";
// import Login from "./components/Login/Login";
// import Products from "./components/Products/Products";
// import Navbar from "./components/Navbar";
// import Register from "./components/Register/Register";
// import Checkout from "./components/Checkout/Checkout";
// import Footer from "./components/Footer/Footer";
// import ThankYou from "./components/thankyou/thankyou";
// import AboutUs from "./components/aboutus/AboutUs";
// import Contact from "./components/Contactus/contactus";
// import Mentorship from "./components/Mentorships/Mentorship";
// import TestSeries from "./components/Testseries/TestSeries";
// import JobList from "./components/Job/Jobpost"
// import JobForm from "./components/JobPost/Jobpost"

// export default function App() {
//   return (
//     <Router>
//       <div className="app-container">
//         <Navbar />

//         <div className="main-content">

 
//           <ToastContainer
//             position="top-right"
//             autoClose={3000}
//             hideProgressBar={false}
//             newestOnTop
//             closeOnClick
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             theme="light"
//             toastClassName={() =>
//               "bg-white text-gray-800 shadow-lg rounded-lg px-4 py-3 border border-gray-300"
//             }
//             bodyClassName={() =>
//               "text-sm font-medium"
//             }
//             progressClassName="bg-blue-500"
//           />

//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/thankyou" element={<ThankYou />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/aboutus" element={<AboutUs />} />
//             {/* <Route path="/dummy" element={<Dummy />} /> */}
//             <Route path="/mentorship" element={<Mentorship />} />
//             <Route path="/testseries" element={<TestSeries />} />
//             <Route path="/job" element={<JobList />} />
//             <Route path="/job_post" element={<JobForm />} />
//           </Routes>

//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaXmark } from "react-icons/fa6";
// import { MdMenu } from "react-icons/md";
// import { toast } from "react-toastify";
// import './Navbar.css'

// export default function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [hasOrder, setHasOrder] = useState(false);
//   const navigate = useNavigate();

//   const isSetpostjob = localStorage.getItem("setpostJob") === "true";
//   const fetchOrders = async () => {
//     try {
//       const userId = localStorage.getItem("userId");
//       if (!userId) return;

//       const response = await fetch(`http://localhost:3001/api/payment/orders/${userId}`);
//       const data = await response.json();

//       if (response.ok && data.orders.length > 0) {
//         setHasOrder(true);
//       } else {
//         setHasOrder(false);
//       }
//     } catch (error) {
//       toast.error("Error fetching orders.");
//       console.error(error);
//     }
//   };



//   useEffect(() => {
//     const authStatus = localStorage.getItem("isAuthenticated") === "true";
//     setIsLoggedIn(authStatus);

//     if (authStatus) {
//       fetchOrders();
//     }
//   }, []);

//   useEffect(() => {
//     if (menuOpen) {
//       document.body.classList.add("no-scroll");
//     } else {
//       document.body.classList.remove("no-scroll");
//     }
//   }, [menuOpen]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("isAuthenticated");
//     localStorage.removeItem("userId");
//     setIsLoggedIn(false);
//     setHasOrder(false);
//     navigate("/login");
//   };

//   return (
//     <>
//       <div className={`overlay ${menuOpen ? "show" : ""}`} onClick={() => setMenuOpen(false)}></div>
//       <div className="!bg-[#e0e0ef] w-full fixed z-[999]">
//         <nav className="page-main px-5 py-5">
//           <div className="navbar-container ">
//             <div className="logo">
//               <Link to="/">Mentoreshwar</Link>
//             </div>
//             <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//               {menuOpen ? <FaXmark /> : <MdMenu />}
//             </div>
//             <div className={`navmenu ${menuOpen ? "open" : ""}`}>
//               <div className="nav-links">
//                 <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
//                 {hasOrder && (
//                   <Link to="/TestSeries" onClick={() => setMenuOpen(false)}>Test Series</Link>
//                 )}
//                 <Link to="/mentorship" onClick={() => setMenuOpen(false)}>Mentorships</Link>
//                 <Link to="/products" onClick={() => setMenuOpen(false)}>Courses</Link>
//                 <Link to="/aboutus">About Us</Link>
//                 {/*    */}
//                 <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
//                 <Link to="/job" onClick={() => setMenuOpen(false)}>Oppurtunities</Link>
//                 {isSetpostjob && (
//                   <Link to="/job_post" onClick={() => setMenuOpen(false)}>Post a Job</Link>
//                 )}
//               </div>
//               <div className="nav-auth">
//                 {isLoggedIn ? (
//                   <button className="logout-btn" onClick={handleLogout}>Logout</button>
//                 ) : (
//                   <Link to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>Login</Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// }



// import React from "react";
// import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
// import "./Hero.css"; // Import styles

// export default function Hero() {
//   return (
//     <>
//       <div>
//         <section className="hero bg-[#0e0e27] ">
//           <div className="hero-container">
//             <div className="hero-text">
//               <h1 className="font-[mulish]">Experience Media Like Never Before</h1>
//               <p className="font-[mulish] !text-base">
//                 Enjoy award-winning stereo beats with wireless listening freedom and sleek,
//                 streamlined with premium padded and delivering first-rate playback.
//               </p>
//               <button className="!bg-[#44448e] !text-white font-[mulish] !text-xl !rounded-full px-5">
//                 Our Products <span>→</span>
//               </button>
//             </div>

//             <div className="hero-image">
//               <img src="https://i.ibb.co/vB5LTFG/Headphone.png" alt="Headphones" />
//             </div>

//             {/* <div className="social-links">
//               <span></span>
//               <a href="#"><FaFacebookF /></a>
//               <a href="#"><FaInstagram /></a>
//               <a href="#"><FaTwitter /></a>
//               <a href="#"><FaYoutube /></a>
//             </div> */}
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }
