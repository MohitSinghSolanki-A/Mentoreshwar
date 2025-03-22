import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
// import { toast } from "react-toastify";
import Logo from "../assets/logo-black.svg"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // const [hasOrder, setHasOrder] = useState(false);
  const navigate = useNavigate();


  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const isSetpostjob = localStorage.getItem("setpostJob") === "true";


  // Fetch orders when user is authenticated
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
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");

    localStorage.removeItem("setpostJob");
    localStorage.removeItem("setpostJob")

    setIsLoggedIn(false);

    navigate("/login");
  };

  return (
    <div>
      {/* Overlay for mobile menu */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity ${menuOpen ? "block" : "hidden"
          }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Navbar */}
      <div className="bg-[#e0e0ef] fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="m-auto flex justify-between w-full max-w-[1440px] py-5 px-5">
          <nav className="w-full">
            <div className="flex justify-between items-center">

              {/* Logo */}
              <Link to="/" className="text-2xl font-![mulish] font-bold">
                <img src={Logo} alt="Mentoreshwar" width={210} />
              </Link>

              {/* Mobile Menu Icon (Visible on md and below) */}
              <div
                className="lg:hidden flex items-center text-3xl cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <FaXmark /> : <MdMenu />}
              </div>

              {/* Navigation Menu */}
              <div
                className={`fixed lg:relative top-0 right-0 h-full lg:h-auto w-[250px] lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none transform ${menuOpen ? "translate-x-0" : "translate-x-full"
                  } lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col lg:flex-row items-start lg:items-center space-y-5 lg:space-y-0 lg:space-x-5 p-5 lg:p-0`}
              >
                {/* Close Button in Mobile Menu */}
                <div className="lg:hidden w-full flex justify-between">
                  <FaXmark className="text-2xl cursor-pointer" onClick={() => setMenuOpen(false)} />
                </div>

                {/* Links */}
                <div className={`flex-col lg:flex lg:flex-row lg:items-center lg:space-x-5 lg:space-y-0 space-y-5 items-start ${menuOpen ? "flex" : "hidden"}`}>
                  <Link
                    to="/"
                    className="text-base font-normal font-![mulish] hover:text-[#272757]"
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </Link>

                  {/* {hasOrder && (
                    <Link
                      to="/TestSeries"
                      className="text-base font-normal font-![mulish] hover:text-[#272757]"
                      onClick={() => setMenuOpen(false)}
                    >
                      Test Series
                    </Link>
                  )} */}

                  <Link
                    to="/mentorship"
                    className="text-base font-normal font-![mulish] hover:text-[#272757]"
                    onClick={() => setMenuOpen(false)}
                  >
                    Mentorships
                  </Link>

                  <Link
                    to="/products"
                    className="text-base font-normal font-![mulish] hover:text-[#272757]"
                    onClick={() => setMenuOpen(false)}
                  >
                    Courses
                  </Link>

                  <Link
                    to="/aboutus"
                    className="text-base font-normal font-![mulish] hover:text-[#272757]"
                    onClick={() => setMenuOpen(false)}
                  >
                    About Us
                  </Link>

                  <Link
                    to="/contact"
                    className="text-base font-normal font-![mulish] hover:text-[#272757]"
                    onClick={() => setMenuOpen(false)}
                  >
                    Contact Us
                  </Link>

                  {isLoggedIn && (
                    <Link
                      to="/free_resources"
                      className="text-base font-normal font-![mulish] hover:text-[#272757]"
                      onClick={() => setMenuOpen(false)}
                    >
                      Resources
                    </Link>
                  )}

                  {isLoggedIn && (
                    <Link
                      to="/job"
                      className="text-base font-normal font-![mulish] hover:text-[#272757]"
                      onClick={() => setMenuOpen(false)}
                    >
                      Opportunities
                    </Link>

                  )}
                  {isSetpostjob && (
                    <Link
                      to="/resources"
                      className="text-base font-normal font-![mulish] hover:text-[#272757]"
                      onClick={() => setMenuOpen(false)}
                    >
                      Add Resources
                    </Link>

                  )}
                  {isSetpostjob && (
                    <Link
                      to="/job_post"
                      className="text-base font-normal font-![mulish] hover:text-[#272757]"
                      onClick={() => setMenuOpen(false)}
                    >
                      Post a Job
                    </Link>
                  )}

                </div>


                {/* Login/Logout Button */}
                <div className="w-full lg:w-auto">
                  {isLoggedIn ? (
                    <button
                      className={`w-full lg:w-auto px-5 py-2 bg-[#44448e] text-white rounded-full hover:bg-[#272757] transition text-base font-normal font-![mulish]`}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="w-full lg:w-auto text-center px-5 py-2 text-base font-normal font-![mulish] bg-[#44448e] text-white rounded-full hover:bg-[#272757] transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Link>
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
