import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import authApiClient from "../services/auth-api-client";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiClient.get("/categories/").then((res) => {
      setCategories(res.data.results);
    });
  }, []);

  const handleProductAdd = async (data) => {
    try {
      const productRes = await authApiClient.post("/products/", data);
      setProductId(productRes.data.id);
    } catch (error) {
      console.log("Error adding product", error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleUpload = async () => {
    if (!images.length) return alert("Please select images.");
    setLoading(true);
    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);
        await authApiClient.post(`/products/${productId}/images/`, formData);
      }
      alert("Images uploaded successfully");
      setLoading(false);
      setImages([]);
      setPreviewImages([]);
    } catch (error) {
      console.log("Error uploading image", error);
      setLoading(false);
    }
  };

  return (
      <div
        className="max-w-2xl mx-auto mt-12 p-8 shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Add New Product</h2>
      {!productId ? (
        <form onSubmit={handleSubmit(handleProductAdd)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Product Name
            </label>
            <input
              {...register("name", { required: true })}
              className={`input input-bordered w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500`}
              placeholder="Product Name"
            />
            {errors.name && (
              <p className="text-red-600 text-xs mt-1">This field is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className={`textarea textarea-bordered w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500`}
              placeholder="Description"
              rows={4}
            />
            {errors.description && (
              <p className="text-red-600 text-xs mt-1">This field is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Price
            </label>
            <input
              type="text"
              {...register("price", {
                required: "This field is required",
                validate: (value) =>
                  !isNaN(parseFloat(value)) || "Please enter a valid number!",
              })}
              className={`input input-bordered w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500`}
              placeholder="Price"
            />
            {errors.price && (
              <p className="text-red-600 text-xs mt-1">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Stock Quantity
            </label>
            <input
              type="number"
              {...register("stock", { required: true })}
              className={`input input-bordered w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500`}
              placeholder="Stock"
            />
            {errors.stock && (
              <p className="text-red-600 text-xs mt-1">This field is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Category
            </label>
            <select
              {...register("category", { required: true })}
              className={`select select-bordered w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500`}
              defaultValue=""
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-600 text-xs mt-1">This field is required</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full py-3 text-lg font-semibold transition-colors duration-200"
          >
            Add Product
          </button>
        </form>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Upload Product Images
          </h3>
          <input
            type="file"
            multiple
            accept="image/*"
            className="file-input file-input-bordered w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            onChange={handleImageChange}
          />
          {previewImages.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                />
              ))}
            </div>
          )}

          <button
            onClick={handleUpload}
            className="btn btn-primary w-full mt-6 py-3 text-lg font-semibold transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Uploading images..." : "Upload Images"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
