const META_KEY = 'stockflow_inventory_meta';
const CREATED_KEY = 'stockflow_created_products';
const DELETED_KEY = 'stockflow_deleted_product_ids';

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ----- Inventory metadata (quantity + lowStockThreshold) per product ID -----
export function getInventoryMeta() {
  return readJSON(META_KEY, {});
}

export function saveInventoryMeta(productId, meta) {
  const all = getInventoryMeta();
  all[productId] = { ...all[productId], ...meta };
  writeJSON(META_KEY, all);
}

// ----- Products created locally -----
export function getCreatedProducts() {
  return readJSON(CREATED_KEY, []);
}

export function saveCreatedProduct(product) {
  const products = getCreatedProducts();
  products.unshift(product);
  writeJSON(CREATED_KEY, products);
}

export function updateCreatedProduct(id, updates) {
  const products = getCreatedProducts().map((p) =>
    p.id === id ? { ...p, ...updates } : p
  );
  writeJSON(CREATED_KEY, products);
}

export function removeCreatedProduct(id) {
  const products = getCreatedProducts().filter((p) => p.id !== id);
  writeJSON(CREATED_KEY, products);
}

// ----- Deleted product IDs -----
export function getDeletedIds() {
  return readJSON(DELETED_KEY, []);
}

export function markAsDeleted(id) {
  const ids = getDeletedIds();
  if (!ids.includes(id)) {
    ids.push(id);
    writeJSON(DELETED_KEY, ids);
  }
}

// ----- Combine everything into the final product list -----
export function applyLocalChanges(apiProducts) {
  const meta = getInventoryMeta();
  const created = getCreatedProducts();
  const deletedIds = getDeletedIds();

  const withMeta = apiProducts
    .filter((p) => !deletedIds.includes(p.id))
    .map((p) => ({
      ...p,
      quantity: meta[p.id]?.quantity ?? p.stock,
      lowStockThreshold: meta[p.id]?.lowStockThreshold ?? 10,
      supplier: p.brand || 'Unknown',
    }));

  return [...created, ...withMeta];
}