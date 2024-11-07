import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { currentUser } from "../api/auth";
import Loading from "../components/animations/Loading";


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
            const role = response.data.employeeRole || response.data.role;
            console.log('response :>> ', response);
            const status = response.data.status;
            console.log('UserRole :>> ', role);
            setTimeout(() => {
                if (allow.includes(role) && status !== 'INACTIVE') {
                    setIsAllowed(true);
                } else {
                    setIsAllowed(false);
                }
            }, 2500);

        } catch (error) {
            console.log('Error detail from protectRoute', error);
            setIsAllowed(false);
        }
    };


    if (isAllowed === null) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    if (!isAllowed) {
        return <Navigate to={'/unauthorization'} />;
    }

    return element;
}

export default ProtectRoute;