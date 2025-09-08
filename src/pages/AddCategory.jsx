import { useState } from "react";
import { useForm } from "react-hook-form";
import authApiClient from "../services/auth-api-client";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authApiClient.post("/categories/", data);
      alert("Category added successfully");
      reset();
    } catch (error) {
      console.error("Error adding category", error);
      alert("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Category</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Category Name
          </label>
          <input
            {...register("name", { required: "Category name is required" })}
            className="input input-bordered w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter category name"
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full py-3 text-lg font-semibold transition-colors duration-200"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
