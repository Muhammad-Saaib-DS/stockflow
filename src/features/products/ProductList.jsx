import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

import {
  fetchProducts,
  deleteProduct,
} from "./productsSlice";

import ProductForm from "./ProductForm";
import Modal from "../../components/Modal";

import "./productList.css";

function ProductList() {
  const dispatch = useDispatch();

  const {
    items: products = [],
    status,
  } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  async function handleDelete(product) {
    const confirmed = window.confirm(
      `Delete "${product.title}"?`
    );

    if (!confirmed) return;

    await dispatch(deleteProduct(product));
  }

  if (status === "loading") {
    return (
      <div className="admin-loading">
        Loading Products...
      </div>
    );
  }

  return (
    <>
      <section className="product-list-page">

        <div className="page-header">

          <div>
            <h1>Products</h1>
            <p>Manage your inventory.</p>
          </div>

          <button
            className="add-product-btn"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus />
            Add Product
          </button>

        </div>

        <div className="admin-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="product-table">

          <div className="table-header">
            <span>Product</span>
            <span>Category</span>
            <span>Price</span>
            <span>Rating</span>
            <span>Actions</span>
          </div>

          {filteredProducts.map((product) => (

            <div
              className="table-row"
              key={product.id}
            >

              <div className="product-cell">

                <img
                  src={product.thumbnail}
                  alt={product.title}
                />

                <span>{product.title}</span>

              </div>

              <span className="category-badge">
                {product.category}
              </span>

              <span>${product.price}</span>

              <span>
                {product.rating ?? "N/A"} ⭐
              </span>

              <div className="table-actions">

                <Link to={`/products/${product.id}`}>
                  <FaEye />
                </Link>

                <button
                  onClick={() => setEditingProduct(product)}
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleDelete(product)}
                >
                  <FaTrash />
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {showAddModal && (
        <Modal
          title="Add Product"
          onClose={() => setShowAddModal(false)}
        >
          <ProductForm
            onSuccess={() => setShowAddModal(false)}
          />
        </Modal>
      )}

      {editingProduct && (
        <Modal
          title="Edit Product"
          onClose={() => setEditingProduct(null)}
        >
          <ProductForm
            existingProduct={editingProduct}
            onSuccess={() => setEditingProduct(null)}
          />
        </Modal>
      )}
    </>
  );
}

export default ProductList;