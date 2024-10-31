import { createContext, useState } from "react";


const UserContext = createContext()

import React from 'react'
import { loginASEmployee, loginGoogle } from "../api/auth";
import { toast } from "react-toastify";

const UserContextProvider = (props) => {

    const [user, setUser] = useState(null)


    const loginEmployee = async (form) => {
        try {
            const response = await loginASEmployee(form)
            setUser(response.data.user.user)
            console.log(user, 'user')
            localStorage.setItem('token', response.data.token)
            const role = response.data.user.user.role
            toast.success(`Login as ${role}`)
            console.log(role);
            // switch (role) {
            //     case 'Tea':
            //         toast.success('Login Success as Customer')
            //         navigate('/customer')
            //         break;
            //     case 'OWNER':
            //         toast.success('Login Success as Owner')
            //         navigate('/owner')
            //         break;
            //     case 'ADMIN':
            //         toast.success('Login Success as Admin')
            //         navigate('/admin')
            //         break;
            // }
        } catch (error) {
            console.log(error.response);
            toast.error('Login Fail Try again');
        }
    };
    const loginWithGoogle = async (token) => {
        try {
            const response = await loginGoogle(token);
            setUser(response.data.user.employee);
            localStorage.setItem('token', response.data.token);
            const role = response.data.user.employee.role;
            toast.success(`Login as ${role}`);
            console.log(role);
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }
    };

    const values = { loginEmployee, loginWithGoogle }


    return (
        <div>
            <UserContext.Provider value={values}>
                {props.children}
            </UserContext.Provider>

        </div>
    )
}

export { UserContextProvider }
export default UserContext
