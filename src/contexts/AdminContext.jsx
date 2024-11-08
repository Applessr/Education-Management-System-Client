import React, { createContext, useState } from "react";
import { adminGetCourseSyllabus, adminGetProfile } from "../api/admin";

const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [adminInfo, setAdminInfo] = useState(null);
    const [courseSyllabus, setCourseSyllabus] = useState(null);
    const [year, setYear] = useState(null);

    const getAdminProfile = async (token) => {
        try {
            const response = await adminGetProfile(token);
            setAdminInfo(response.data)
        } catch (error) {
            console.log(error.response);
        }

    }
    const getCourseSyllabus = async (token, majorId, year) => {
        try {
            const response = await adminGetCourseSyllabus(token, majorId, year);
            setCourseSyllabus(response.data)
        } catch (error) {
            console.log(error.response);
        }

    }

    const values = { getAdminProfile, adminInfo, getCourseSyllabus, courseSyllabus, setYear, year };

    return (
        <AdminContext.Provider value={values}>
            {props.children}
        </AdminContext.Provider>
    );
};

export { AdminContextProvider };
export default AdminContext;