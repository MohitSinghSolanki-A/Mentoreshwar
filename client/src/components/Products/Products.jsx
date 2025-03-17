import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("❌ Failed to load products. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectSelection = (productId, subject) => {
    setSelectedSubjects((prev) => {
      const selectedSet = new Set(prev[productId] || []);
      selectedSet.has(subject.name)
        ? selectedSet.delete(subject.name)
        : selectedSet.add(subject.name);
      return { ...prev, [productId]: Array.from(selectedSet) };
    });
  };

  const calculateTotalPrice = useMemo(
    () => (product) => {
      const selected = selectedSubjects[product._id] || [];
      const selectedSubjectsData = product.subjects.filter((sub) =>
        selected.includes(sub.name)
      );

      let totalPrice = selectedSubjectsData.reduce((acc, sub) => acc + sub.price, 0);
      let discount = 0;

      if (selected.length === 2) discount = 0.10;
      else if (selected.length === 3) discount = 0.125;
      else if (selected.length >= 4) discount = 0.15;

      const discountedPrice = totalPrice - totalPrice * discount;

      return { totalPrice, discountedPrice };
    },
    [selectedSubjects]
  );

  const handleBuyNow = (product) => {
    if (!isAuthenticated) {
      toast.warn("⚠️ Please log in to buy!");
      return;
    }
    const selected = selectedSubjects[product._id] || [];
    if (selected.length === 0) {
      toast.warn("⚠️ Please select at least one subject!");
      return;
    }

    const { discountedPrice } = calculateTotalPrice(product);

    localStorage.setItem(
      "checkoutDetails",
      JSON.stringify({
        productId: product._id,
        subjects: selected,
        discountedPrice: discountedPrice.toFixed(2),
      })
    );

    navigate(`/checkout`);
  };

  return (
    <div className="pt-24 px-6 bg-gray-50 min-h-screen">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          🚀 Exclusive Test Series
        </h1>

        {loading ? (
          <div className="text-center text-lg font-semibold">Loading...</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => {
              const { totalPrice, discountedPrice } = calculateTotalPrice(product);
              return (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-3 p-6 flex flex-col items-center border border-gray-200"
                >
                  <img
                    src={product.imageUrl || "https://via.placeholder.com/300x200"}
                    alt={product.title}
                    className="w-full h-52 object-cover rounded-xl"
                  />
                  <div className="text-center mt-5">
                    <h3 className="text-2xl font-bold text-gray-900">{product.title}</h3>
                    <p className="text-gray-600 mt-1 text-sm">{product.description}</p>
                  </div>

                  {product.isTestSeries && (
                    <div className="w-full mt-5">
                      <h4 className="text-gray-800 font-semibold mb-3">Choose Subjects:</h4>
                      <div className="flex flex-wrap gap-3">
                        {product.subjects.map((subject) => (
                          <button
                            key={subject.name}
                            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${selectedSubjects[product._id]?.includes(subject.name)
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                              }`}
                            onClick={() => handleSubjectSelection(product._id, subject)}
                          >
                            {subject.name} - ₹{subject.price}
                          </button>
                        ))}
                      </div>

                      {selectedSubjects[product._id]?.length > 0 && (
                        <div className="mt-4 text-center">
                          <p className="text-lg font-semibold text-gray-900">
                            Total Price:{" "}
                            {selectedSubjects[product._id]?.length === 1 ? (
                              <span className="text-black font-bold">₹{totalPrice}</span>
                            ) : (
                              <>
                                <span className="line-through text-red-500">₹{totalPrice}</span>
                                {totalPrice !== discountedPrice && (
                                  <span className="text-green-600 font-bold ml-2">
                                    ₹{discountedPrice.toFixed(2)}
                                  </span>
                                )}
                              </>
                            )}
                          </p>
                        </div>
                      )}

                      <button
                        className="w-full mt-6 bg-[#44448E] text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-transform hover:scale-105 focus:outline-none"
                        onClick={() => handleBuyNow(product)}
                      >
                        🛒 Buy Now
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}