import { useEffect, useState } from "react";
import CategoryItem from "../components/Home/Categories/CategoryItem";
import apiClient from "../services/api-client";


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        apiClient.get("/categories").then((res) => setCategories(res.data.results))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return(
        <div className="flex justify-center items-center py-10 min-h-screen">
            <div className="loading loading-spinner loading-xl text-lime-700"></div>
        </div>
    );

    return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-svh p-16">
            {categories.map((category, index) => (
            <CategoryItem key={category.id} index={index} category={category} />
            ))}
        </div>
    </div>
    );
};

export default Categories;