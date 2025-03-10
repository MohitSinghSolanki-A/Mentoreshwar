import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { toast } from "react-toastify";
import './Navbar.css'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasOrder, setHasOrder] = useState(false);
  const navigate = useNavigate();

  const isSetpostjob = localStorage.getItem("setpostJob") === "true";
  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const response = await fetch(`http://localhost:3001/api/payment/orders/${userId}`);
      const data = await response.json();

      if (response.ok && data.orders.length > 0) {
        setHasOrder(true);
      } else {
        setHasOrder(false);
      }
    } catch (error) {
      toast.error("Error fetching orders.");
      console.error(error);
    }
  };



  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsLoggedIn(authStatus);

    if (authStatus) {
      fetchOrders();
    }
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
    setIsLoggedIn(false);
    setHasOrder(false);
    navigate("/login");
  };

  return (
    <>
      <div className={`overlay ${menuOpen ? "show" : ""}`} onClick={() => setMenuOpen(false)}></div>
      <div className="!bg-[#e0e0ef] w-full fixed z-[999]">
        <nav className="page-main px-5 py-5">
          <div className="navbar-container ">
            <div className="logo">
              <Link to="/">Mentoreshwar</Link>
            </div>
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaXmark /> : <MdMenu />}
            </div>
            <div className={`navmenu ${menuOpen ? "open" : ""}`}>
              <div className="nav-links">
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                {hasOrder && (
                  <Link to="/TestSeries" onClick={() => setMenuOpen(false)}>Test Series</Link>
                )}
                <Link to="/mentorship" onClick={() => setMenuOpen(false)}>Mentorships</Link>
                <Link to="/products" onClick={() => setMenuOpen(false)}>Courses</Link>
                <Link to="/aboutus">About Us</Link>
                {/*    */}
                <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
                <Link to="/job" onClick={() => setMenuOpen(false)}>Oppurtunities</Link>
                {isSetpostjob && (
                  <Link to="/job_post" onClick={() => setMenuOpen(false)}>Post a Job</Link>
                )}
              </div>
              <div className="nav-auth">
                {isLoggedIn ? (
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                ) : (
                  <Link to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>Login</Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
