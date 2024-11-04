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

export const studentGetExamDate = (token) => axios.get('/student/exam-date', {
    headers: {
        Authorization: `Bearer ${token}`
    }
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

export const teacherChangePassword = (token, body) => axios.patch('/student/change-password', body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
