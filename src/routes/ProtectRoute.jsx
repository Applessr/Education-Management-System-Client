import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { currentUser } from "../api/auth";

function ProtectRoute({ element, allow }) {
    const [isAllowed, setIsAllowed] = useState(null);
    const { setUser } = useUser();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkRole(token);
        } else {
            setIsAllowed(false);
        }
    }, []);

    const checkRole = async (token) => {
        try {
            const response = await currentUser(token);
            setUser(response.data);
            const role = response.data.role || response.data.employeeRole;
            console.log('response :>> ', response);
            const status = response.data.status;
            console.log('UserRole :>> ', role);

            if (allow.includes(role) && status !== 'INACTIVE') {
                setIsAllowed(true);
            } else {
                setIsAllowed(false);
            }
        } catch (error) {
            console.log('Error detail from protectRoute', error);
            setIsAllowed(false);
        }
    };


    if (isAllowed === null) {
        return <span className="loading loading-dots loading-lg"></span>;
    }

    if (!isAllowed) {
        return <Navigate to={'/unauthorization'} />;
    }

    return element;
}

export default ProtectRoute;