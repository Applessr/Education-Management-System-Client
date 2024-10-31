import axios from "../configs/axios"

export const registerEmployee = (form) => axios.post('/auth/register', form)

export const registerStudent = (form) => axios.post('/auth/register', form)

export const loginAsEmployee = (form) => axios.post('/auth/login-employee', form)

export const loginAsStudent = (form) => axios.post('/auth/login-student', form)

export const loginGoogle = (token) => axios.post('/auth/login-google', { token });
