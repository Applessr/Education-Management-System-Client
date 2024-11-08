import axios from "../configs/axios"

export const registerEmployee = (form) => axios.post('/auth/register', form)

export const registerStudent = (form) => axios.post('/auth/register', form)

export const loginAsEmployee = (form) => axios.post('/auth/login-employee', form)

export const loginAsStudent = (form) => axios.post('/auth/login-student', form)

export const loginGoogle = (token) => axios.post('/auth/login-google', { token });

export const forgetPassword = (body) => axios.post('/auth/forget-password', body);

export const resetPassword = (token, newPassword) => axios.post('/auth/reset-password', { token, newPassword });

export const currentUser = (token) => axios.get('/auth/current-user', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})