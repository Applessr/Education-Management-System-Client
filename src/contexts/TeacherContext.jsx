import React, { createContext, useState } from "react";
import { teacherGetProfile } from "../api/teacher";

const TeacherContext = createContext();

const TeacherContextProvider = (props) => {
    const [teacherInfo, setTeacherInfo] = useState(null);
    const token = localStorage.getItem('token');

    const getTeacherProfile = async () => {
        try {
            const response = await teacherGetProfile(token);
            setTeacherInfo(response.data)
        } catch (error) {
            console.log('error in getTeacherProfile', error.response);
        }

    }

    const values = { getTeacherProfile, teacherInfo };

    return (
        <TeacherContext.Provider value={values}>
            {props.children}
        </TeacherContext.Provider>
    );
};

export { TeacherContextProvider };
export default TeacherContext;