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


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Products() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [selectedSubjects, setSelectedSubjects] = useState({});
//   const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/products");
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleSubjectSelection = (productId, subject) => {
//     setSelectedSubjects((prev) => {
//       const productSubjects = new Set(prev[productId] || []);
//       productSubjects.has(subject.name)
//         ? productSubjects.delete(subject.name)
//         : productSubjects.add(subject.name);
//       return { ...prev, [productId]: Array.from(productSubjects) };
//     });
//   };

//   const calculateTotalPrice = (product) => {
//     const selected = selectedSubjects[product._id] || [];
//     const selectedSubjectsData = product.subjects.filter((sub) =>
//       selected.includes(sub.name)
//     );

//     let totalPrice = selectedSubjectsData.reduce((acc, sub) => acc + sub.price, 0);
//     let discount = 0;

//     // Apply discount based on number of subjects selected
//     if (selected.length === 2) discount = 0.10; // 10% discount
//     else if (selected.length === 3) discount = 0.125; // 12.5% discount
//     else if (selected.length >= 4) discount = 0.15; // 15% discount

//     const discountedPrice = totalPrice - totalPrice * discount;

//     return { totalPrice, discountedPrice };
//   };

//   const handleBuyNow = (product) => {
//     if (!isAuthenticated) {
//       toast.warn("⚠️ Please log in to buy!", { position: "top-right" });
//       return;
//     }
//     const selected = selectedSubjects[product._id] || [];
//     if (selected.length === 0) {
//       toast.warn("⚠️ Please select at least one subject!", { position: "top-right" });
//       return;
//     }
//     navigate(
//       `/checkout?productId=${product._id}&subjects=${encodeURIComponent(selected.join(", "))}`
//     );
//   };

//   return (
//     <div className="pt-24 px-4">
//       <ToastContainer />
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
//           Available Test Series
//         </h1>
//         <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {products.map((product) => {
//             const { totalPrice, discountedPrice } = calculateTotalPrice(product);
//             return (
//               <div
//                 key={product._id}
//                 className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-5 flex flex-col items-center"
//               >
//                 <img
//                   src={product.imageUrl || "https://via.placeholder.com/300x200"}
//                   alt={product.title}
//                   className="w-full h-48 object-cover rounded-xl"
//                 />
//                 <div className="text-center mt-4">
//                   <h3 className="text-xl font-semibold text-gray-900">{product.title}</h3>
//                   <p className="text-gray-600 mt-2">{product.description}</p>
//                 </div>
//                 {product.isTestSeries && (
//                   <div className="w-full mt-4">
//                     <h4 className="text-gray-800 font-medium mb-2">Select Subjects:</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {product.subjects.map((subject) => (
//                         <label
//                           key={subject.name}
//                           className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg cursor-pointer"
//                         >
//                           <input
//                             type="checkbox"
//                             className="w-5 h-5 text-blue-600 focus:ring focus:ring-blue-400"
//                             checked={selectedSubjects[product._id]?.includes(subject.name) || false}
//                             onChange={() => handleSubjectSelection(product._id, subject)}
//                           />
//                           <span className="text-gray-700">{subject.name} - ₹{subject.price}</span>
//                         </label>
//                       ))}
//                     </div>

//                     {selectedSubjects[product._id]?.length > 0 && (
//                       <div className="mt-4 text-center">
//                     <p className="text-lg font-medium text-gray-800">
//   Total Price: 
//   {selectedSubjects[product._id]?.length === 1 ? (
//     <span className="text-black">₹{totalPrice}</span>
//   ) : (
//     <>
//       <span className="line-through text-red-500">₹{totalPrice}</span>
//       {totalPrice !== discountedPrice && (
//         <span className="text-green-600 font-bold ml-2">₹{discountedPrice.toFixed(2)}</span>
//       )}
//     </>
//   )}
// </p>
//                       </div>
//                     )}

//                     <button
//                       className="w-full mt-4 bg-[#44448E] text-white py-2 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-transform hover:scale-105 focus:outline-none"
//                       onClick={() => handleBuyNow(product)}
//                     >
//                       💳 Buy Now
//                     </button>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
