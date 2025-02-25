// src/api/clickhouseAxios.js

import axios from 'axios'

// Create an axios instance with ClickHouse-specific configuration
const clickhouseApi = axios.create({
  baseURL: import.meta.env.VITE_CLICKHOUSE_URL, // Default ClickHouse HTTP interface port
  timeout: 30000, // 30 seconds timeout
  headers: {
    'X-ClickHouse-User': `${import.meta.env.VITE_CLICKHOUSE_USER}`,    // Your ClickHouse username
    'X-ClickHouse-Key': `${import.meta.env.VITE_CLICKHOUSE_PASSWORD}`,           // Your ClickHouse password (empty if none)
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  params: {
    // Default parameters for all requests
    default_format: 'JSON'  // Can be 'JSONCompact', 'CSV', etc.
  }
})

// Request interceptor to handle any request modifications
clickhouseApi.interceptors.request.use(
  (config) => {
    // You can add additional request modifications here if needed
    console.log('Making request to ClickHouse:', config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle responses
clickhouseApi.interceptors.response.use(
  (response) => {
    // Process the response data as needed
    return response.data
  },
  (error) => {
    // Handle errors globally
    console.error('ClickHouse API Error:', error.message)
    return Promise.reject(error)
  }
)

export default clickhouseApi