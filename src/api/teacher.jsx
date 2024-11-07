import axios from "../configs/axios"

export const teacherGetProfile = (token) => axios.get('/teacher/profile', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const teacherGetEnrollRequest = (token) => axios.get('/teacher/enroll-request', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const teacherGetStudentInCourse = (token) => axios.get('/teacher/student-course', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const teacherGetStudentInCourseById = (token, courseId) => axios.get('/teacher/student-course/' + courseId, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const teacherGetConsultedStudent = (token) => axios.get('/teacher/consulted-student', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const teacherGetRequestChangeSec = (token) => axios.get('/teacher/request-section', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const teacherSendEditRequest = (token, body) => axios.post('/teacher/request-change', body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const teacherSendAnnouncement = (token, body) => axios.post('/teacher/send-announce', body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const teacherChangePassword = (token, body) => axios.patch('/teacher/change-password', body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const teacherEditStudentEnroll = (token, enrollmentId, body) => axios.patch('/teacher/update-enroll-status/' + enrollmentId, body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const teacherEditRequestStatus = (token, requestId, body) => axios.patch('/teacher/update-request-status/' + requestId, body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const teacherEditStudentSec = (token, enrollmentId, body) => axios.patch('/teacher/update-section/' + enrollmentId, body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});