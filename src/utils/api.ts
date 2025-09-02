// API configuration using environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const NODE_ENV = import.meta.env.VITE_NODE_ENV || 'development';

export { API_BASE_URL, NODE_ENV };