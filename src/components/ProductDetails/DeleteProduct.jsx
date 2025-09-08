import apiClient from "../../services/api-client";

const DeleteProduct = ({ product, onDelete}) => {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await apiClient.delete(`/products/${product.id}/`);
      onDelete();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={"w-full md:w-1/2 bg-pink-500 text-white py-2 rounded hover:bg-red-500 transition"}
    >
      Delete Product
    </button>
  );
};

export default DeleteProduct;