import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAsEmployee, loginAsStudent, loginGoogle } from "../api/auth";
import { toast } from "react-toastify";

const UserContext = createContext();

const UserContextProvider = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const loginStudent = async (form) => {
        try {
            const response = await loginAsStudent(form);
            console.log(response)
            setUser(response.data.student.student);
            localStorage.setItem('token', response.data.token);
            const role = 'STUDENT'
            navigate('/student');

        } catch (error) {
            console.log(error.response);
            toast.error('Login Fail Try again');
        }
    };
    const loginEmployee = async (form) => {
        try {
            const response = await loginAsEmployee(form);
            setUser(response.data.user.user);
            localStorage.setItem('token', response.data.token);
            const role = response.data.user.user.role;
            switch (role) {
                case 'TEACHER':
                    toast.success('Login Success as teacher');
                    navigate('/teacher');
                    break;
                case 'ADMIN':
                    toast.success('Login Success as Admin');
                    navigate('/admin');
                    break;
                default:
                    toast.success('Login Success');
            }
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
            const role = response.data.user.employeeRole;
            switch (role) {
                case 'TEACHER':
                    toast.success('Login Success as teacher');
                    navigate('/teacher');
                    break;
                case 'ADMIN':
                    toast.success('Login Success as Admin');
                    navigate('/admin');
                    break;
                default:
                    toast.success('Login Success');
            }
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }
    };
    const logout = () => {
        try {
            setUser(null)
            localStorage.removeItem('token');
            toast.success('Log Out')
            navigate('/')
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }

    };

    const values = { loginEmployee, loginStudent, loginWithGoogle, user, setUser, logout };

    return (
        <UserContext.Provider value={values}>
            {props.children}
        </UserContext.Provider>
    );
};

export { UserContextProvider };
export default UserContext;
