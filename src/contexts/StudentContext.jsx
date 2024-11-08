import React, { createContext, useState } from "react";
import { studentGetCredit, studentGetProfile } from "../api/student";
import { studentGetGPA, studentGetGPABySemester, studentViewGrade } from "../api/grade";

const StudentContext = createContext();

const StudentContextProvider = (props) => {
    const [studentInfo, setStudentInfo] = useState(null);
    const [studentGrade, setStudentGrade] = useState(null);
    const [studentCredit, setStudentCredit] = useState(null);
    const [studentGPA, setStudentGPA] = useState(null);
    const [studentCPA, setStudentCPA] = useState(null);
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

    const values = { getStudentProfile, studentInfo, studentGrade, getStudentGetGrade, getStudentGetCredit, studentCredit, getStudentGetCPA,getStudentGetGPA,studentGPA,studentCPA };

    return (
        <StudentContext.Provider value={values}>
            {props.children}
        </StudentContext.Provider>
    );
};

export { StudentContextProvider };
export default StudentContext;