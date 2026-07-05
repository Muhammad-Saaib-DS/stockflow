const FEATURES = [
  { icon: '🔐', title: 'Role-Based Access', desc: 'Admin, Manager, and User roles with different permissions across the app.' },
  { icon: '📦', title: 'Full Product CRUD', desc: 'Create, view, edit, and delete inventory items with validation.' },
  { icon: '🏷️', title: 'Category Management', desc: 'Add, edit, and remove categories used across your product catalog.' },
  { icon: '🔍', title: 'Search, Filter & Sort', desc: 'Real-time search, category filtering, and multiple sort options.' },
  { icon: '⚠️', title: 'Low Stock Alerts', desc: 'Automatic detection and visualization of products running low.' },
  { icon: '📊', title: 'Data Visualization', desc: 'Bar and pie charts summarizing stock levels and inventory health.' },
  { icon: '🌗', title: 'Theme Persistence', desc: 'Light/dark mode preference saved across sessions.' },
  { icon: '⚡', title: 'Pagination', desc: 'Efficient browsing through large product lists.' },
];

const TECH_STACK = [
  'React (Vite)',
  'React Router v6',
  'Redux Toolkit',
  'Context API',
  'Axios',
  'Recharts',
  'DummyJSON API',
];

function About() {
  return (
    <div>
      <div className="about-hero">
        <h1>About StockFlow</h1>
        <p>
          A full-stack-style inventory and product management dashboard, built as a
          React frontend application with a mock/demo backend — demonstrating
          authentication, role-based access control, CRUD operations, and data
          visualization used in real business systems.
        </p>
      </div>

      <div className="about-section-title">Core Features</div>
      <div className="feature-grid">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="feature-item">
            <div className="feature-icon">{feature.icon}</div>
            <div>
              <h4>{feature.title}</h4>
              <p>{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="about-section-title">Built With</div>
      <div className="tech-pills">
        {TECH_STACK.map((tech) => (
          <span key={tech} className="tech-pill">
            <span className="dot"></span>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default About;