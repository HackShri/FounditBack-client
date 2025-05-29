import axios from "axios"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user")
    if (user) {
      const userData = JSON.parse(user)
      if (userData.token) {
        config.headers.Authorization = `Bearer ${userData.token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear user data and redirect to login
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  signup: (userData) => api.post("/auth/signup", userData),
  logout: () => api.post("/auth/logout"),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
}

// Items API calls
export const itemsAPI = {
  // Lost items
  getLostItems: () => api.get("/items/lost"),
  createLostItem: (itemData) => api.post("/items/lost", itemData),
  updateLostItem: (id, itemData) => api.put(`/items/lost/${id}`, itemData),
  deleteLostItem: (id) => api.delete(`/items/lost/${id}`),

  // Found items
  getFoundItems: () => api.get("/items/found"),
  createFoundItem: (itemData) => api.post("/items/found", itemData),
  updateFoundItem: (id, itemData) => api.put(`/items/found/${id}`, itemData),
  deleteFoundItem: (id) => api.delete(`/items/found/${id}`),

  // Search
  searchItems: (query) => api.get(`/items/search?q=${query}`),
}

// Image upload API calls
export const imageAPI = {
  uploadImages: (formData) =>
    api.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteImage: (imageId) => api.delete(`/images/${imageId}`),
}

// Chat API calls
export const chatAPI = {
  getChats: () => api.get("/chats"),
  getChatMessages: (chatId) => api.get(`/chats/${chatId}/messages`),
  sendMessage: (chatId, message) => api.post(`/chats/${chatId}/messages`, message),
  createChat: (itemId, participantId) => api.post("/chats", { itemId, participantId }),
}

export default api
