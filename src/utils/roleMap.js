// Maps DummyJSON usernames to roles for OUR app's role-based access control.
// DummyJSON itself has no "role" field, so we maintain this mapping ourselves.
// These 3 accounts were manually verified as live/working on DummyJSON's server.

export const ROLE_MAP = {
  emilys: 'admin',
  michaelw: 'manager',
  sophiab: 'user',
};

export function getRoleForUsername(username) {
  // Default to 'user' for any account not explicitly listed above
  return ROLE_MAP[username] || 'user';
}