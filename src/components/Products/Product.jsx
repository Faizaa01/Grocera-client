import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import ErrorAlert from "../ErrorAlert";
import apiClient from "../../services/api-client";
import { Link } from "react-router";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/products/")
      .then((res) => setProducts(res.data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const displayedProducts = products.slice(0, 8);

  return (
    <section className="bg-[#f7f4f0] py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-600 mb-4 font-serif text-balance"> Trending Products</h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Discover our carefully curated collection of products, sourced from the finest suppliers worldwide.
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-dots loading-xl text-[#9a7d69]"></span>
          </div>
        )}

        {error && <ErrorAlert error={error} />}

        {!isLoading && !error && displayedProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayedProducts.map((product, index) => (
              <ProductItem key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        {!isLoading && !error && displayedProducts.length === 0 && (
          <p className="text-center text-[#6b6a68] mt-6 text-lg">
            No Products Available
          </p>
        )}
      </div>
      <div className="text-center mt-8">
        <Link to='/shop' className="bg-[#9a7065] hover:bg-amber-900 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
          View All
        </Link>
      </div>
    </section>
  );
};

export default Product;
