// IMPORT HTTP REQUESTS LIBRARY
import axios from 'axios'


// SETUP CUSTOM INSTANCE
export const customFetch = axios.create({
	baseURL: '/api/v1'
})