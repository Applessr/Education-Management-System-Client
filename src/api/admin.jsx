import axios from "../configs/axios"


export const adminGetProfile = (token) => axios.get('/admin/profile', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const adminGetStudent = (token) => axios.get('/admin/student', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const adminGetTeacher = (token) => axios.get('/admin/teacher', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const adminGetStudentById = (token, studentId) => axios.get('/admin/student' + studentId, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const adminGetTeacherById = (token, teacherId) => axios.get('/admin/teacher' + teacherId, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const adminGetChangeRequest = (token) => axios.get('/admin/request', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const adminGetChangeRequestById = (token, requestId) => axios.get('/admin/request/' + requestId, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const adminRegisterStudent = (token, body) => axios.post('/admin/register-student', body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const adminRegisterTeacher = (token, body) => axios.post('/admin/register-employee', body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const adminChangeStudentStatus = (token, studentId, body) => axios.patch('/admin/student-status/' + studentId, body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const adminEditStudentInfo = (token, studentId, body) => axios.patch('/admin/student-change-info/' + studentId, body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const adminEditTeacherInfo = (token, employeeId, body) => axios.patch('/admin/employee-change-info/' + employeeId, body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const adminInactiveAccount = (token, employeeId) => axios.patch(
    `/admin/employee-inactive/` + employeeId,
    {}, // empty object for request body
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

export const adminActiveAccount = (token, employeeId) => axios.patch(
    `/admin/employee-active/` + employeeId,
    {}, // empty object for request body
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

