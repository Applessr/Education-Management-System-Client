import React, { createContext, useState } from "react";
import { teacherGetConsultedStudent, teacherGetProfile, teacherGetStudentInCourseById } from "../api/teacher";
import { teacherGetCourse } from "../api/course";

const TeacherContext = createContext();

const TeacherContextProvider = (props) => {
    const [teacherInfo, setTeacherInfo] = useState(null);
    const [consulted, setConsulted] = useState(null);
    const [course, setCourse] = useState(null);
    const [selectCourse, setSelectCourse] = useState(null);
    const [studentInCourse, setStudentInCourse] = useState(null);
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
            console.log(response.data)
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
            if (response?.data) {
                setStudentInCourse(response.data);
            } else {
                console.log("No data found");
            }
        } catch (error) {
            console.error('Error in getTeacherProfile:', error.response || error.message);
        }
    };

    const values = { getTeacherProfile, teacherInfo, teacherGetConsulted, consulted, teacherCourse, course, setSelectCourse, selectCourse, getStudentIdCourseById,studentInCourse };

    return (
        <TeacherContext.Provider value={values}>
            {props.children}
        </TeacherContext.Provider>
    );
};

export { TeacherContextProvider };
export default TeacherContext;