import { useNavigate } from "react-router";

const EditProductButton = ({ productId }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/dashboard/products/edit/${productId}`);
  };

  return (
    <button
      onClick={handleEdit}
      className="w-full md:w-1/2 bg-yellow-400 text-white py-2 rounded hover:bg-yellow-600 transition"
    >
      Edit Product
    </button>
  );
};

export default EditProductButton;
