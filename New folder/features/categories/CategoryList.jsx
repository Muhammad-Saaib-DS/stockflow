import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory, editCategory, deleteCategory } from './categoriesSlice';

function CategoryList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.categories);

  const [newName, setNewName] = useState('');
  const [formError, setFormError] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editError, setEditError] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  function validateName(name, excludeId = null) {
    const trimmed = name.trim();

    if (!trimmed) {
      return 'Category name cannot be empty.';
    }
    if (trimmed.length < 3) {
      return 'Category name must be at least 3 characters.';
    }
    const duplicate = items.some(
      (c) => c.name.toLowerCase() === trimmed.toLowerCase() && c.id !== excludeId
    );
    if (duplicate) {
      return 'A category with this name already exists.';
    }
    return '';
  }

  function handleAdd(e) {
    e.preventDefault();

    const validationError = validateName(newName);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    dispatch(addCategory(newName.trim()));
    setNewName('');
    setFormError('');
  }

  function startEditing(category) {
    setEditingId(category.id);
    setEditName(category.name);
    setEditError('');
  }

  function handleSaveEdit(e) {
    e.preventDefault();

    const validationError = validateName(editName, editingId);
    if (validationError) {
      setEditError(validationError);
      return;
    }

    dispatch(editCategory({ id: editingId, name: editName.trim() }));
    setEditingId(null);
  }

  function handleDelete(id) {
    const confirmed = window.confirm('Delete this category? Products using it will keep their category name as text.');
    if (confirmed) {
      dispatch(deleteCategory(id));
    }
  }

  return (
    <div>
      <div className="page-header"><h1>Category Management</h1></div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <form onSubmit={handleAdd} className="task-form-row">
          <input
            className="input"
            type="text"
            placeholder="New category name..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">Add Category</button>
        </form>
        {formError && <p className="error-text">{formError}</p>}
      </div>

      {status === 'loading' && <p className="state-message">Loading categories...</p>}
      {status === 'failed' && <p className="state-message error-text">{error}</p>}

      <ul>
        {items.map((category) => (
          <li key={category.id} className="task-item" style={{ marginBottom: '0.5rem' }}>
            {editingId === category.id ? (
              <form onSubmit={handleSaveEdit} style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
                <input
                  className="input"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">Save</button>
                <button className="btn btn-secondary" type="button" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
                {editError && <p className="error-text">{editError}</p>}
              </form>
            ) : (
              <>
                <span style={{ flex: 1 }}>{category.name}</span>
                <button className="btn btn-secondary" onClick={() => startEditing(category)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(category.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;