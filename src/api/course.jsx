import axios from "../configs/axios"

export const getAllCourse = () => axios.get('/course/all-course');

export const getAllMajor = () => axios.get('/course/all-major');

export const getAllFaculty = () => axios.get('/course/all-faculty');

export const getMajorById = (facultyId) => axios.get('/course/major/' + facultyId);

export const getCourseBySearch = (searchQuery) => axios.get(`/course/all-course?searchTerm=${searchQuery}`);

export const getCourseById = (courseId) => axios.get('/course/all-course/' + courseId);

export const studentGetCourseSyllabus = (token) => axios.get('/course/student/course-syllabus', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const studentGetEnrollCourse = (token) => axios.get('/course/student/enroll-course', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const teacherGetCourse = (token) => axios.get('/course/teacher', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const studentGetEnrollCourseBySemester = (token, body) => axios.get('/course/student/enroll-course-semester', body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const studentGetClassSchedule = (token, semester) => axios.get('/course/student/class-schedule', {
    params: { semester }, 
    headers: {
        Authorization: `Bearer ${token}` 
    }
});

export const studentSendEnrollRequest = (token, body) => axios.post('/course/student/enroll-course', body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const studentCancelEnrollRequest = (token, courseId) => axios.patch('/course/student/cancel-course' + courseId, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const employeeCreateCourse = (token, body) => axios.post('/course/employee/create-course', body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const employeeEditCourse = (token, courseId, body) => axios.patch(`/course/employee/edit-course/${courseId}`, body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const employeeInactiveCourse = (token, courseId) => axios.patch('/course/employee/inactive-course/' + courseId, {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const employeeActiveCourse = (token, courseId) => axios.patch('/course/employee/active-course/' + courseId, {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const assignCourseToSyllabus = (token, body) => axios.post('/course/employee/assign-syllabus', body, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});