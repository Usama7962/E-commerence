"use client";
import { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../../api/productApi";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const itemsPerPage = 6;
  const [page, setPage] = useState(1);

  // 🔹 GET all products (initial load)
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data.slice(0, itemsPerPage)); // first batch
      if (data.length <= itemsPerPage) setHasMore(false);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Infinite Scroll function
  const fetchMoreData = async () => {
    try {
      const data = await getProducts();
      const nextBatch = data.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

      if (nextBatch.length === 0) {
        setHasMore(false);
        return;
      }

      setProducts((prev) => [...prev, ...nextBatch]);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("More fetch error:", err);
    }
  };

  // 🔹 DELETE product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(id);
      alert("✅ Product deleted!");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // 🔹 OPEN update form
  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: null,
    });
  };

  // 🔹 SUBMIT update
  const handleUpdate = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("description", formData.description);

      if (formData.image instanceof File) {
        data.append("image", formData.image);
      }

      const updated = await updateProduct(editingProduct, data);

      alert("✅ Product updated!");
      setProducts((prev) =>
        prev.map((p) => (p._id === editingProduct ? updated : p))
      );
      setEditingProduct(null);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // 🔹 Skeleton Loader
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
      <div className="w-full aspect-[4/3] bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-5 bg-gray-200 rounded w-1/4 mt-2"></div>
      </div>
    </div>
  );

  return (
    <div className="mt-8 md:mt-0 md:p-8 bg-gray-50 min-h-screen ">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 text-center md:text-left">
        📦 All Products
      </h1>

      {/* 🔹 Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          No products found. Please add some!
        </p>
      ) : (
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className="text-center">Loading more...</h4>}
          endMessage={
            <p className="text-center text-gray-500 py-4">
              🎉 You have seen all products
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="p-4 flex-1 flex flex-col">
                  <p className="font-semibold text-gray-900 text-lg ">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-600 flex-1">
                    {product.description}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xl font-bold text-indigo-600">
                      ${product.price}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center px-4 pb-4">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded-lg hover:bg-yellow-500 transition"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}

      {/* 🔹 Update Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md md:max-w-lg">
            <h2 className="text-lg md:text-xl font-bold mb-4">
              ✏️ Update Product
            </h2>

            <input
              type="text"
              placeholder="Name"
              className="w-full border p-2 rounded mb-2"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full border p-2 rounded mb-2"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="w-full border p-2 rounded mb-2"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <input
              type="file"
              className="w-full border p-2 rounded mb-4"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
            />

            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 w-full sm:w-auto"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
