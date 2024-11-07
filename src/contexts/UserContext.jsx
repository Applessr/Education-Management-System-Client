import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAsEmployee, loginAsStudent, loginGoogle } from "../api/auth";
import { toast } from "react-toastify";
import { getAllFaculty, getMajorById } from "../api/course";

const UserContext = createContext();

const UserContextProvider = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [allFaculty, setAllFaculty] = useState(null);
    const [selectMajor, setSelectMajor] = useState(null);
    const [errorLogin, setErrorLogin] = useState(null);

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
            setErrorLogin(error.response.data.message)
            toast.error('Login Fail Try again');
        }
    };
    const loginEmployee = async (form) => {
        try {
            const response = await loginAsEmployee(form);
            setUser(response.data.user.user);
            console.log(response.data)
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
            setErrorLogin(error.response.data.message)
            toast.error('Login Fail Try again');
        }
    };
    const loginWithGoogle = async (token) => {
        try {
            const response = await loginGoogle(token);
            if (!response?.data?.user?.employee?.role) {
                throw new Error("Role information is missing from the response");
            }

            const role = response.data.user.employee.role;

            setUser(response.data.user.employee);
            localStorage.setItem('token', response.data.token);

            switch (role) {
                case 'TEACHER':
                    toast.success('Login Success as teacher');
                    navigate('/teacher', { replace: true });
                    break;
                case 'ADMIN':
                    toast.success('Login Success as Admin');
                    navigate('/admin', { replace: true });
                    break;
                default:
                    toast.success('Login Success');
                    navigate('/');
            }
        } catch (error) {
            console.error("Error logging in with Google:", error);
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
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
    const getFaculty = async () => {
        try {
            const response = await getAllFaculty();
            setAllFaculty(response.data)
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }
    }
    const getMajorByFac = async (facultyId) => {
        try {
            const response = await getMajorById(facultyId);
            setSelectMajor(response.data)
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }
    }

    const values = { loginEmployee, loginStudent, loginWithGoogle, user, setUser, logout, getFaculty, allFaculty, getMajorByFac, selectMajor, errorLogin };

    return (
        <UserContext.Provider value={values}>
            {props.children}
        </UserContext.Provider>
    );
};

export { UserContextProvider };
export default UserContext;
