import { useForm } from "react-hook-form";
import StarRating from "./StarRating";

const ReviewForm = ({ onSubmit }) => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const ratingValue = watch("ratings", 0);

  return (
    <form
      className="space-y-3 dark:bg-gray-600 p-4 rounded-xl shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center gap-3">
        <label className="font-medium text-gray-100">
          Rating:
        </label>
        <StarRating
          rating={ratingValue}
          onChange={(value) => setValue("ratings", value)}
        />
        <input type="hidden" {...register("ratings", { required: true })} />
      </div>
      {errors.ratings && (
        <p className="text-red-400 text-sm">Rating is required</p>
      )}

      <div className="flex flex-col">
        <textarea
          {...register("comment", { required: true })}
          className="textarea textarea-bordered min-h-[60px] max-h-[120px] w-full resize-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 rounded-lg text-sm"
          placeholder="Share your experience..."
        />
        {errors.comment && (
          <p className="text-red-400 text-sm mt-1">Comment is required</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-sm btn-indigo w-full md:w-auto"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
