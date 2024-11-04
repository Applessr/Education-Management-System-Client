import React, { createContext, useState } from "react";
import { studentGetProfile } from "../api/student";

const StudentContext = createContext();

const StudentContextProvider = (props) => {
    const [studentInfo, setStudentInfo] = useState(null);
    const token = localStorage.getItem('token');

    const getStudentProfile = async () => {
        try {
            const response = await studentGetProfile(token);
            setStudentInfo(response.data)
        } catch (error) {
            console.log(error.response);
        }

    }

    const values = { getStudentProfile, studentInfo };

    return (
        <StudentContext.Provider value={values}>
            {props.children}
        </StudentContext.Provider>
    );
};

export { StudentContextProvider };
export default StudentContext;