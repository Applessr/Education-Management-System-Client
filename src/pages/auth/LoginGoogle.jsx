import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import React from 'react'
import useUser from '../../hooks/useUser';

const LoginGoogle = () => {
    const { loginWithGoogle } = useUser()
    const handleLogin = async (credentialResponse) => {
        const token = credentialResponse.credential;
        const decoded = jwtDecode(token);

        console.log("Token:", token);
        console.log("Decoded token:", decoded);

        await loginWithGoogle(token);
    };

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <div className='m-auto w-full flex justify-center rounded-lg'>
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

// import { useGoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';
// import React from 'react'
// import useUser from '../../hooks/useUser';

// const LoginGoogle = () => {
//     const { loginWithGoogle } = useUser()
    
//     const handleLogin = useGoogleLogin({
//         flow: 'popup',
//         onSuccess: async (credentialResponse) => {
//             const token = credentialResponse.credential;
//             if (!token) {
//                 console.log("Login failed: No token received.");
//                 return;
//             }


//             const decoded = jwtDecode(token);
//             console.log("Token:", token);
//             console.log("Decoded token:", decoded);

//             await loginWithGoogle(token);
//         },
//         onError: () => {
//             console.log("Login Failed");
//         },
//     });

//     return (
//             <div className='m-auto w-full flex justify-center rounded-lg'>
//                 <button
//                     onClick={handleLogin}
//                     className="w-full flex justify-center gap-5 bg-[rgb(250,254,255)] text-[#272988] rounded-lg py-4 px-6 text-xl hover:bg-[rgba(197,197,197,0.66)] shadow-lg transition-colors font-semibold">
//                     <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google icon" className="w-6 h-6" />
//                     <span>Login with Google</span>
//                 </button>
//             </div>
//     )
// }

// export default LoginGoogle


