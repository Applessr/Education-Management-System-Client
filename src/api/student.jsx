import axios from "../configs/axios"

export const studentGetProfile = (token) => axios.get('/student/profile', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const studentGetNotification = (token) => axios.get('/student/notification', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const studentGetCredit = (token) => axios.get('/student/credit', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const studentGetExamDate = (token, semester) => axios.get('/student/exam-date', {
    headers: {
        Authorization: `Bearer ${token}`
    },
    params: { semester }  
});

export const studentSendEditRequest = (token, body) => axios.post('/student/request-change', body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const studentSendRequestSec = (token, body) => axios.post('/student/request-section', body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const studentChangePassword = (token, body) => axios.post('/student/change-password', body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const studentFetchPublishableKey = (token) => axios.get('/student/config', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const studentCheckPayMent = (token, body) => axios.get('/student/check-payment', {
    headers: {
        Authorization: `Bearer ${token}`
    },
    params: body
});

export const studentCreatePaymentIntent = (token, body) => axios.post('/student/create-payment-intent', body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const studentPayTuition = (token, body) => axios.post('/student/pay-tuition-fee', body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

