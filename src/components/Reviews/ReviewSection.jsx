import { useParams } from "react-router";
import ReviewForm from "./ReviewForm";
import authApiClient from "../../services/auth-api-client";
import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import apiClient from "../../services/api-client";
import useAuthContext from "../../hooks/useAuthContext";

const ReviewSection = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [userCanReview, setUserCanReview] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [editReview, setEditReview] = useState({ ratings: 0, comment: "" });
  const [editingId, setEditingId] = useState(null);
  const { user } = useAuthContext();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get(`/products/${productId}/reviews/`);
      setReviews(res.data);
    } catch (error) {
      console.log("Error fetching reviews", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await authApiClient.post(`/products/${productId}/reviews/`, data);
      fetchReviews();
    } catch (error) {
      console.log("Error submitting review", error);
    }
  };

  const checkUserPermission = async () => {
    try {
      const res = await authApiClient.get(`/orders/has-ordered/${productId}/`);
      setUserCanReview(res.data.hasOrdered);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateReview = async (reviewId) => {
    try {
      await authApiClient.put(
        `/products/${productId}/reviews/${reviewId}/`,
        editReview
      );
      setEditingId(null);
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await authApiClient.delete(`/products/${productId}/reviews/${reviewId}/`);
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUserPermission();
    fetchReviews();
  }, []);
  return (
   <div className="space-y-6 mt-10 max-w-5xl mx-auto px-4">
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold text-gray-900">
        Customer Reviews
      </h2>
      <div className="badge badge-lg p-4 bg-indigo-100 text-indigo-800">
        {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
      </div>
    </div>

    {userCanReview && (
      <div className="bg-sky-50 rounded-2xl shadow-md p-6 border border-indigo-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Write a Review
        </h3>
        <ReviewForm onSubmit={onSubmit} />
    </div>
  )}

  <div className="divider border-t-2 dark:border-gray-600"></div>

  {isLoading ? (
    <div className="flex justify-center py-8">
      <span className="loading loading-spinner loading-lg text-indigo-500"></span>
    </div>
  ) : reviews.length === 0 ? (
    <div className="text-center py-8 text-gray-500 dark:text-gray-300">
      <div className="text-6xl mb-4">📝</div>
      <h3 className="text-2xl font-semibold mb-2">No Reviews Yet</h3>
      <p>Be the first to review this product!</p>
    </div>
  ) : (
    <div className="space-y-4">
      <ReviewList
        reviews={reviews}
        user={user}
        editReview={editReview}
        setEditReview={setEditReview}
        editingId={editingId}
        setEditingId={setEditingId}
        handleUpdateReview={handleUpdateReview}
        handleDeleteReview={handleDeleteReview}
      />
    </div>
  )}
</div>

  );
};

export default ReviewSection;