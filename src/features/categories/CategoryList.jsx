import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaTags } from "react-icons/fa";
import { fetchCategories, addCategory, editCategory, deleteCategory } from "./categoriesSlice";

import "./categoryList.css";

function CategoryList() {
  const dispatch = useDispatch();
  const { items: categories = [], status } = useSelector((state) => state.categories);

  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [formError, setFormError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const filteredCategories = categories.filter((category) =>
    category.name?.toLowerCase().includes(search.toLowerCase())
  );

  function validateName(name, excludeId = null) {
    const trimmed = name.trim();
    if (!trimmed) return "Category name cannot be empty.";
    if (trimmed.length < 3) return "Category name must be at least 3 characters.";
    const duplicate = categories.some(
      (c) => c.name.toLowerCase() === trimmed.toLowerCase() && c.id !== excludeId
    );
    if (duplicate) return "A category with this name already exists.";
    return "";
  }

  function handleAdd(e) {
    e.preventDefault();
    const error = validateName(newName);
    if (error) {
      setFormError(error);
      return;
    }
    dispatch(addCategory(newName.trim()));
    setNewName("");
    setFormError("");
  }

  function startEditing(category) {
    setEditingId(category.id);
    setEditName(category.name);
  }

  function saveEdit(id) {
    const error = validateName(editName, id);
    if (error) {
      alert(error);
      return;
    }
    dispatch(editCategory({ id, name: editName.trim() }));
    setEditingId(null);
  }

  function handleDelete(id) {
    if (window.confirm("Delete this category?")) {
      dispatch(deleteCategory(id));
    }
  }

  if (status === "loading") {
    return (
      <div className="category-loading">
        Loading Categories...
      </div>
    );
  }

  return (
    <section className="category-page">

      <div className="category-header">
        <div>
          <h1>Categories</h1>
          <p>Organize products by categories.</p>
        </div>
      </div>

      <form
        onSubmit={handleAdd}
        style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}
      >
        <input
          type="text"
          placeholder="New category name..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button type="submit" className="category-add-btn">
          <FaPlus />
          Add Category
        </button>
      </form>

      {formError && <p style={{ color: "red" }}>{formError}</p>}

      <div className="category-search">
        <FaSearch />
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="category-grid">
        {filteredCategories.map((category) => (
          <div className="category-card" key={category.id}>

            <div className="category-icon">
              <FaTags />
            </div>

            {editingId === category.id ? (
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button onClick={() => saveEdit(category.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <h3>{category.name}</h3>

                <div className="category-actions">
                  <button onClick={() => startEditing(category)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(category.id)}>
                    <FaTrash />
                  </button>
                </div>
              </>
            )}

          </div>
        ))}
      </div>

    </section>
  );
}

export default CategoryList;