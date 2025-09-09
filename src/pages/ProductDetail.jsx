import { Link, useNavigate, useParams } from "react-router";
import AddToCartButton from "../components/ProductDetails/AddToCartButton";
import ProductImage from "../components/ProductDetails/ProductImage";
import { FaArrowLeft } from "react-icons/fa";
import { Suspense, useEffect, useState } from "react";
import apiClient from "../services/api-client";
import ReviewSection from "../components/Reviews/ReviewSection";
import DeleteProduct from "../components/ProductDetails/DeleteProduct";
import EditProductButton from "../components/ProductDetails/EditProductButton";
import useAuth from "../hooks/useAuth";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();


  useEffect(() => {
    setLoading(true);
    apiClient.get(`/products/${productId}/`).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [productId]);

  if (loading) return(
    <div className="flex justify-center items-center py-10 min-h-screen">
        <span className="loading loading-spinner loading-xl text-stone-400"></span>
    </div>
  );
  if (!product) return <div className="flex justify-center items-center py-10 min-h-screen">Product Not Found...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-base-content/70 hover:text-base-content transition-colors"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          Back to products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <Suspense
          fallback={
            <div className="aspect-square bg-base-300 animate-pulse rounded-lg"></div>
          }
        >
            <ProductImage 
              images={product?.images} 
              productName={product.name} 
            />
        </Suspense>
        <div className="flex flex-col space-y-6">
          <div>
            <div className="badge badge-outline badge-xl badge-success mb-2">
              Category: {product.category}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              {product.name}
            </h1>
            <h4 className="text-gray-700 text-sm mt-2">
              Seller: {product.seller.name}
            </h4>
          </div>
          <div>
            <span className="text-3xl font-bold text-neutral opacity-80">${product.price}</span>
          </div>

          <div className="prose prose-sm text-base-content/80">
            <p>{product.description}</p>
          </div>

            <div className="flex items-center">
              <div className="mr-2 text-sm font-medium">Availability:</div>
              {product.stock > 0 ? (
                <div className="badge badge-outline bg-info/10 text-info border-info/20">
                  In Stock
                </div>
              ) : (
                <div className="badge badge-outline bg-error/10 text-error border-error/20">
                  Out of Stock
                </div>
              )}
            </div>

          <div className="mt-auto">
            <AddToCartButton product={product} />
          </div>
          {(user?.is_staff || user?.id === product.seller.id) && (
            <div className="mt-4 flex flex-col md:flex-row gap-2">
              <DeleteProduct product={product} onDelete={() => navigate("/shop")} />
              <EditProductButton productId={product.id} />
            </div>
          )}
        </div>
      </div>
      <ReviewSection />
    </div>
  );
};

export default ProductDetail;