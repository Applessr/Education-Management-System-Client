import React, { createContext, useState } from "react";
import { studentCheckPayMent, studentGetCredit, studentGetExamDate, studentGetNotification, studentGetProfile } from "../api/student";
import { studentGetGPA, studentGetGPABySemester, studentViewGrade, studentViewScorePerSub } from "../api/grade";
import { studentGetClassSchedule } from "../api/course";

const StudentContext = createContext();

const StudentContextProvider = (props) => {
    const [studentInfo, setStudentInfo] = useState(null);
    const [studentGrade, setStudentGrade] = useState(null);
    const [studentCredit, setStudentCredit] = useState(null);
    const [studentGPA, setStudentGPA] = useState(null);
    const [studentCPA, setStudentCPA] = useState(null);
    const [studentPayMent, setStudentPayMent] = useState(null);
    const [studentScore, setStudentScore] = useState(null);
    const [classSchedule, setClassSchedule] = useState(null);
    const [examDate, setExamDate] = useState(null);
    const [notification, setNotification] = useState(null);
    const token = localStorage.getItem('token');

    const getStudentProfile = async () => {
        try {
            const response = await studentGetProfile(token);
            setStudentInfo(response.data)
        } catch (error) {
            console.log(error.response);
        }
    }
    const getStudentGetGrade = async (token) => {
        try {
            const response = await studentViewGrade(token);
            setStudentGrade(response.data)
        } catch (error) {
            console.log(error.response);
        }
    }
    const getStudentGetCredit = async (token) => {
        try {
            const response = await studentGetCredit(token);
            setStudentCredit(response.data)
        } catch (error) {
            console.log(error.response);
        }
    }
    const getStudentGetGPA = async (token) => {
        try {
            const response = await studentGetGPABySemester(token);
            console.log('response :>> ', response);
            setStudentGPA(response.data)
        } catch (error) {
            console.log(error.response);
        }
    }
    const getStudentGetCPA = async (token) => {
        try {
            const response = await studentGetGPA(token);
            console.log('response :>> ', response);
            setStudentCPA(response.data)
        } catch (error) {
            console.log(error.response);
        }
    }
    const getStudentPayMentStatus = async (token, semester) => {
        try {
            const response = await studentCheckPayMent(token, { semester });
            console.log('response :>> ', response);
            setStudentPayMent(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }
    const getStudentScore = async (token, courseId) => {
        try {
            const response = await studentViewScorePerSub(token, courseId);
            console.log('response :>> ', response);
            setStudentScore(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }
    const getClassSchedule = async (token, semester) => {
        try {
            const response = await studentGetClassSchedule(token, semester);
            console.log('response getClassSchedule :>> ', response);
            setClassSchedule(response.data);
        } catch (error) {
            console.log(error.response); 
        }
    };
    const getExamDate = async (token,semester) => {
        try {
            const response = await studentGetExamDate(token,semester);
            console.log('response :>> ', response);
            setExamDate(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }
    const getNotification = async (token) => {
        try {
            const response = await studentGetNotification(token);
            console.log('response :>> ', response);
            setNotification(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    const values = {
        getStudentProfile,
        studentInfo,
        studentGrade,
        getStudentGetGrade,
        getStudentGetCredit,
        studentCredit,
        getStudentGetCPA,
        getStudentGetGPA,
        studentGPA,
        studentCPA,
        studentPayMent,
        getStudentPayMentStatus,
        studentScore,
        getStudentScore,
        getClassSchedule,
        classSchedule,
        getExamDate,
        examDate,
        getNotification,
        notification,
    };

    return (
        <StudentContext.Provider value={values}>
            {props.children}
        </StudentContext.Provider>
    );
};

export { StudentContextProvider };
export default StudentContext;