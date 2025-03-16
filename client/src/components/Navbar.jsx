import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
// import { toast } from "react-toastify";
import Logo from "../assets/logo.svg"


export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // const [hasOrder, setHasOrder] = useState(false);
  const navigate = useNavigate();


  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const isSetpostjob = localStorage.getItem("setpostJob") === "true";

  // const fetchOrders = async () => {
  //   try {
  //     const userId = localStorage.getItem("userId");
  //     if (!userId) return;

  //     const response = await fetch(`http://localhost:3001/api/payment/orders/${userId}`);
  //     const data = await response.json();

  //     if (response.ok && data.orders.length > 0) {
  //       setHasOrder(true);
  //     } else {
  //       setHasOrder(false);
  //     }
  //   } catch (error) {
  //     toast.error("Error fetching orders.");
  //     console.error(error);
  //   }
  // };



  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsLoggedIn(authStatus);

    // if (authStatus) {
    //   fetchOrders();
    // }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    localStorage.removeItem("setpostJob")
    setIsLoggedIn(false);
    // setHasOrder(false);
    navigate("/login");
  };

  return (
    <div>
      <div className={`fixed inset-0 bg-black bg-opacity-50 ${menuOpen ? "block" : "hidden"}`} onClick={() => setMenuOpen(false)}></div>

      <div className="bg-[#e0e0ef] fixed top-0 left-0 w-full z-50">
        <div className="m-auto flex justify-between w-full max-w-[1440px] py-5 px-5">
          <nav className="w-full">
            <div className="flex justify-between items-center">
              <img src={Logo} alt="Mentoreshwar Logo" className="max-h-20 max-w-40" />
              <Link to="/" className="text-2xl font-[mulish] font-bold">Mentoreshwar</Link>



              <div className="flex items-center cursor-pointer text-3xl md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaXmark /> : <MdMenu />}
              </div>


              <div className={`fixed md:relative top-0 right-0 h-full md:h-auto w-[250px] md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none transform ${menuOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col md:flex-row items-start md:items-center space-y-5 md:space-y-0 md:space-x-5 p-5 md:p-0`}>


                <div className="md:hidden w-full flex justify-end">
                  <FaXmark className="text-2xl cursor-pointer" onClick={() => setMenuOpen(false)} />
                </div>

                {/* <Link to="/" className="text-base font-normal font-[mulish] hover:text-[#272757]" onClick={() => setMenuOpen(false)}>Home</Link>
                {hasOrder && (
                  <Link to="/TestSeries" className="text-base font-normal font-[mulish] hover:text-[#272757]" onClick={() => setMenuOpen(false)}>Test Series</Link>
                )} */}
                <Link to="/mentorship" className="text-base font-normal font-[mulish] hover:text-[#272757]" onClick={() => setMenuOpen(false)}>Mentorships</Link>
                <Link to="/products" className="text-base font-normal font-[mulish] hover:text-[#272757]" onClick={() => setMenuOpen(false)}>Courses</Link>
                <Link to="/aboutus" className="text-base font-normal font-[mulish] hover:text-[#272757]" onClick={() => setMenuOpen(false)}>About Us</Link>
                <Link to="/contact" className="text-base font-normal font-[mulish] hover:text-[#272757]" onClick={() => setMenuOpen(false)}>Contact Us</Link>
                <Link to="/job" className="text-base font-normal font-[mulish] hover:text-[#272757]" onClick={() => setMenuOpen(false)}>Opportunities</Link>
                {isSetpostjob && (
                  <Link to="/job_post" className="text-base font-normal font-[mulish] hover:text-[#272757]" onClick={() => setMenuOpen(false)}>Post a Job</Link>
                )}

                {/* Login/Logout Button */}
                <div className="w-full md:w-auto">
                  {isLoggedIn ? (
                    <button className="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition text-base font-normal font-[mulish]" onClick={handleLogout}>Logout</button>
                  ) : (
                    <Link to="/login" className="px-5 py-2 text-base font-normal font-[mulish] bg-[#272757] text-white rounded-full hover:bg-[#44448e] transition" onClick={() => setMenuOpen(false)}>Login</Link>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
