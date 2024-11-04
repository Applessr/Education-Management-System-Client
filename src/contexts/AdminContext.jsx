import React, { createContext, useState } from "react";
import { adminGetProfile } from "../api/admin";

const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [adminInfo, setAdminInfo] = useState(null);
    const token = localStorage.getItem('token');

    const getAdminProfile = async () => {
        try {
            const response = await adminGetProfile(token);
            setAdminInfo(response.data)
        } catch (error) {
            console.log(error.response);
        }

    }

    const values = { getAdminProfile, adminInfo };

    return (
        <AdminContext.Provider value={values}>
            {props.children}
        </AdminContext.Provider>
    );
};

export { AdminContextProvider };
export default AdminContext;