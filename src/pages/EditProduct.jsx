import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import authApiClient from "../services/auth-api-client";

const EditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          authApiClient.get(`/products/${productId}/`),
          authApiClient.get("/categories/")
        ]);
        setProduct(prodRes.data);
        setCategories(catRes.data.results);
        setValue("name", prodRes.data.name);
        setValue("description", prodRes.data.description);
        setValue("price", prodRes.data.price);
        setValue("stock", prodRes.data.stock);
        setValue("category", prodRes.data.category.id);
      } catch (err) {
        console.error("Failed to fetch product or categories", err);
      }
    };
    fetchData();
  }, [productId, setValue]);

  const handleUpdate = async (data) => {
    try {
      await authApiClient.put(`/products/${productId}/`, data);
      alert("Product updated successfully!");
    } catch (err) {
      console.error("Failed to update product", err);
      alert("Failed to update product");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleUploadImages = async () => {
    if (!images.length) return alert("Please select images.");
    setLoading(true);
    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);
        await authApiClient.post(`/products/${productId}/images/`, formData);
      }
      alert("Images uploaded successfully!");
      setImages([]);
      setPreviewImages([]);
    } catch (err) {
      console.error("Failed to upload images", err);
    } finally {
      setLoading(false);
    }
  };

  if (!product) return(
    <div className="flex justify-center items-center py-10 min-h-screen">
        <span className="loading loading-spinner loading-xl text-black"></span>
    </div>  
  )

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Edit Product</h2>

      <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Product Name
          </label>
          <input 
            {...register("name", { required: true })} 
            placeholder="Product Name" 
            className="input input-bordered w-full" 
          />
          {errors.name && <p className="text-red-600 text-xs">Required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Description
          </label>
          <textarea 
            {...register("description", { required: true })} 
            placeholder="Description" 
            className="textarea textarea-bordered w-full" rows={4}
          />
          {errors.description && <p className="text-red-600 text-xs">Required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Price
          </label>
          <input 
            type="number" step="0.01" 
            {...register("price", { required: true })} 
            placeholder="Price" 
            className="input input-bordered w-full"
          />
          {errors.price && <p className="text-red-600 text-xs">Required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Stock Quantity
          </label>
          <input 
            type="number" 
            {...register("stock", { required: true })} 
            placeholder="Stock Quantity" 
            className="input input-bordered w-full" 
          />
          {errors.stock && <p className="text-red-600 text-xs">Required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Category
          </label>
          <select 
            {...register("category", { required: true })} 
            className="select select-bordered w-full">
            <option value="">
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-600 text-xs mt-1">Required</p>}
        </div>

        <button type="submit" className="btn btn-primary opacity-80 w-full mt-4 py-3 font-semibold transition-colors duration-200">Update Product</button>
      </form>

      {/* Image Upload */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Upload Images</h3>
        <input type="file" multiple accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full" />
        {previewImages.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {previewImages.map((src, idx) => (
              <img key={idx} src={src} alt={`Preview ${idx}`} className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
        )}
        <button onClick={handleUploadImages} className="btn btn-secondary w-full mt-6 py-3 font-semibold transition-colors duration-200" disabled={loading}>
          {loading ? "Uploading..." : "Upload Images"}
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
