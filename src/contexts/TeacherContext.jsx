import React, { createContext, useState } from "react";
import { teacherEditRequestStatus, teacherGetConsultedStudent, teacherGetEnrollRequest, teacherGetProfile, teacherGetStudentInCourseById } from "../api/teacher";
import { teacherGetCourse } from "../api/course";

const TeacherContext = createContext();

const TeacherContextProvider = (props) => {
    const [teacherInfo, setTeacherInfo] = useState(null);
    const [consulted, setConsulted] = useState(null);
    const [course, setCourse] = useState(null);
    const [selectCourse, setSelectCourse] = useState(null);
    const [studentInCourse, setStudentInCourse] = useState(null);
    const [enroll, setEnroll] = useState(null);
    const token = localStorage.getItem('token');

    const getTeacherProfile = async () => {
        try {
            const response = await teacherGetProfile(token);
            setTeacherInfo(response.data)
        } catch (error) {
            console.log('error in getTeacherProfile', error.response);
        }

    }
    const teacherGetConsulted = async (token) => {
        try {
            const response = await teacherGetConsultedStudent(token);
            if (response?.data) {
                setConsulted(response.data);
            } else {
                console.log("No data found");
            }
        } catch (error) {
            console.error('Error in getTeacherProfile:', error.response || error.message);
        }
    };
    const teacherCourse = async (token) => {
        try {
            const response = await teacherGetCourse(token);
            if (response?.data) {
                setCourse(response.data);
            } else {
                console.log("No data found");
            }
        } catch (error) {
            console.error('Error in getTeacherProfile:', error.response || error.message);
        }
    };
    const getStudentIdCourseById = async (token, courseId) => {
        try {
            const response = await teacherGetStudentInCourseById(token, courseId);
            console.log("Data from getStudentIdCourseById:", response.data);
            if (response?.data) {
                setStudentInCourse(response.data);
            } else {
                console.log("No data found");
            }
        } catch (error) {
            console.error('Error in getTeacherProfile:', error.response || error.message);
        }
    };
    const getEnrollRequest = async (token) => {
        try {
            console.log('hello');
            const response = await teacherGetEnrollRequest(token);
            console.log("Data from getEnrollRequest:", response.data);
            if (response?.data) {
                setEnroll(response.data);
            } else {
                console.log("No data found");
            }
        } catch (error) {
            console.error('Error in getEnrollRequest:', error.response || error.message);
        }
    };
    const editEnrollStatus = async (token, requestId, body) => {
        try {
            const response = await teacherEditRequestStatus(token, requestId, body);
            console.log("Data from editEnrollStatus:", response.data);
        } catch (error) {
            console.error('Error in editEnrollStatus:', error.response || error.message);
        }
    };

    const values = {
        getTeacherProfile,
        teacherInfo,
        teacherGetConsulted,
        consulted,
        teacherCourse,
        course,
        setSelectCourse,
        selectCourse,
        getStudentIdCourseById,
        studentInCourse,
        enroll,
        getEnrollRequest,
        editEnrollStatus
    };

    return (
        <TeacherContext.Provider value={values}>
            {props.children}
        </TeacherContext.Provider>
    );
};

export { TeacherContextProvider };
export default TeacherContext;