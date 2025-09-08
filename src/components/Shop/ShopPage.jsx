import { useEffect, useState } from "react";
import Filter from "./Filter";
import Pagination from "./Pagination";
import ProductList from "./ProductList";
import useFetchProduct from "../../hooks/useFetchProducts";
import useFetchCategories from "../../hooks/useFetchCategories";
import { useSearchParams } from "react-router";

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const [selectedCategory, setSelecetedCategory] = useState(initialCategory);

  const { products, loading, totalPages } = useFetchProduct(
    currentPage,
    priceRange,
    selectedCategory,
    searchQuery,
    sortOrder
  );

  const categories = useFetchCategories();

  const handlePriceChange = (index, value) => {
    setPriceRange((prev) => {
      const newRange = [...prev];
      newRange[index] = value;
      return newRange;
    });
    setCurrentPage(1);
  };

  

  return (
    <div className="w-full mx-auto px-20 py-6 bg-stone-100">
    <div className="p-4 rounded-lg mb-8">
      <Filter
        priceRange={priceRange}
        handlePriceChange={handlePriceChange}
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={setSelecetedCategory}
        searchQuery={searchQuery}
        handleSearchQuery={setSearchQuery}
        sortOrder={sortOrder}
        handleSorting={setSortOrder}
      />
      </div>
      <h1 className="text-3xl font-serif text-center font-bold mb-8">Shop Our Products</h1>
      <ProductList products={products} loading={loading} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={setCurrentPage}
      />
    </div>
  );
};

export default ShopPage;