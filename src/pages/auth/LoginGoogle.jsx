import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import React from 'react'
import useUser from '../../hooks/useUser';

const LoginGoogle = () => {
    const { loginWithGoogle } = useUser()
    const handleLogin = async (credentialResponse) => {
        const token = credentialResponse.credential;
        const decoded = jwtDecode(token);

        await loginWithGoogle(token)
        console.log(decoded);
    };

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <div className='m-auto w-full border rounded-lg'>
                <GoogleLogin
                    onSuccess={handleLogin}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>

        </GoogleOAuthProvider>
    )
}

export default LoginGoogle