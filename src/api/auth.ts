import axios from 'axios'

type LoginResponse = {
    message: string
    token: string
    username: string
}
type RegisterResponse = {
    message: string
}

export type RegisterParams = {
    username: string
    email: string
    password: string
    passwordConfirmation: string
}

export const login = (email: string, password: string) => {
    const url = `${import.meta.env.VITE_BASE_URL}/login`
    const data = { email, password }
    try {
        return axios.post<LoginResponse>(url, data)
    } catch (error) {
        console.error(error)
    }
}
export const register = (params: RegisterParams) => {
    const url = `${import.meta.env.VITE_BASE_URL}/register`
    const data = params
    try {
        return axios.post<RegisterResponse>(url, data)
    } catch (error) {
        console.error(error)
    }
}
