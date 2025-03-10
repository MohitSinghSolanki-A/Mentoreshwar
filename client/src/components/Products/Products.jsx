import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubjectSelection = (productId, subject) => {
    setSelectedSubjects((prev) => {
      const productSubjects = new Set(prev[productId] || []);
      productSubjects.has(subject.name)
        ? productSubjects.delete(subject.name)
        : productSubjects.add(subject.name);
      return { ...prev, [productId]: Array.from(productSubjects) };
    });
  };

  const handleBuyNow = (product) => {
    if (!isAuthenticated) {
      toast.warn("⚠️ Please log in to buy!", { position: "top-right" });
      return;
    }
    const selected = selectedSubjects[product._id] || [];
    if (selected.length === 0) {
      toast.warn("⚠️ Please select at least one subject!", { position: "top-right" });
      return;
    }
    navigate(
      `/checkout?productId=${product._id}&subjects=${encodeURIComponent(selected.join(", "))}`
    );
  };

  return (
    <div className="pt-24 px-4">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
          Available Test Series
        </h1>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-5 flex flex-col items-center"
            >
              <img
                src={product.imageUrl || "https://via.placeholder.com/300x200"}
                alt={product.title}
                className="w-full h-48 object-cover rounded-xl"
              />
              <div className="text-center mt-4">
                <h3 className="text-xl font-semibold text-gray-900">{product.title}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
              </div>
              {product.isTestSeries && (
                <div className="w-full mt-4">
                  <h4 className="text-gray-800 font-medium mb-2">Select Subjects:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.subjects.map((subject) => (
                      <label
                        key={subject.name}
                        className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-blue-600 focus:ring focus:ring-blue-400"
                          checked={selectedSubjects[product._id]?.includes(subject.name) || false}
                          onChange={() => handleSubjectSelection(product._id, subject)}
                        />
                        <span className="text-gray-700">{subject.name} - ₹{subject.price}</span>
                      </label>
                    ))}
                  </div>
                  <button
                    className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-transform hover:scale-105 focus:outline-none"
                    onClick={() => handleBuyNow(product)}
                  >
                    💳 Buy Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
