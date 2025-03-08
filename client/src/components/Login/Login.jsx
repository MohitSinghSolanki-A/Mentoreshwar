import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showRegister, setShowRegister] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowRegister(false);

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("isAuthenticated", "true");

        toast.success("🎉 Login successful!", { position: "top-right" });

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        if (data.error === "Invalid credentials") {
          toast.error("❌ Incorrect password!", { position: "top-right" });
        } else if (data.error === "User not found") {
          setShowRegister(true);
          toast.warn("⚠️ No account found! Register first.", { position: "top-right" });
        } else {
          toast.error("❌ Login failed!", { position: "top-right" });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("❌ Something went wrong. Try again!", { position: "top-right" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {showRegister && (
          <button
            className="w-full mt-4 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
            onClick={() => navigate("/register")}
          >
            Register Here
          </button>
        )}
      </div>
    </div>
  );
}
