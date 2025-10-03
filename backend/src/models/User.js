// Simple in-memory user storage for development
// Replace with PostgreSQL later

const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@bunasiem.et',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'admin',
    createdAt: new Date()
  },
  {
    id: 2, 
    username: 'tsegay',
    email: 'tsegay@bunasiem.et',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'user',
    createdAt: new Date()
  }
];

const User = {
  findOne: async (query) => {
    if (query.where && query.where.username) {
      return users.find(user => user.username === query.where.username) || null;
    }
    return null;
  },
  
  findById: async (id) => {
    return users.find(user => user.id === parseInt(id)) || null;
  }
};

module.exports = User;
