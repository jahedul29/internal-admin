import React, { useState } from 'react';
import './style.scss';
import { getAsync } from './../../services/httpClient/HttpClient';
import { setAuthData } from '../../services/auth/auth';
import { useHistory } from 'react-router-dom';
import { Alert } from '@mui/material';

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const history = useHistory();
    const [errorMsg, setErrorMsg] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if(userName.length < 1){
            alert("Please enter username");
            return;
        }
        if(password.length < 1){
            alert("Please enter Password");
            return;
        }
        setIsFormSubmitting(true);

        const response = await getAsync(`/validate/password?username=${userName}&password=${password}`, false);

        if(response?.status === 200){
            setErrorMsg("");
            setAuthData(response.data);
            setIsFormSubmitting(false);
            history.push('/');
        } else {
            setErrorMsg(response?.response?.data?.message)
        }
        setIsFormSubmitting(false);
    };



    return (
        <div className="login-page-container flex items-center justify-center">
            <div className="container py-12 px-6 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <div className="xl:w-5/12">
                        <div className="block bg-white shadow-lg rounded-lg">
                            <div className="lg:flex lg:flex-wrap g-0">
                                <div className="lg:w-full px-4 md:px-0">
                                    <div className="md:p-12 md:mx-6">
                                        {
                                            errorMsg && <Alert severity="error">{errorMsg}</Alert>
                                        }
                                        <form className="mt-5" onSubmit={handleFormSubmit}>
                                            <p className="mb-4">Please login to your account</p>
                                            <div className="mb-4">
                                                <input
                                                    type="text"
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id="exampleFormControlInput1"
                                                    placeholder="Username"
                                                    onChange={(e)=> setUserName(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <input
                                                    type="password"
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id="exampleFormControlInput1"
                                                    placeholder="Password"
                                                    onChange={(e)=> setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="text-center pt-1 pb-1">
                                                <button
                                                    className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                    type="submit"
                                                    data-mdb-ripple="true"
                                                    data-mdb-ripple-color="light"
                                                    style={{
                                                        background: "linear-gradient( to right,#ee7724,#d8363a,#dd3675,#b44593)"
                                                    }}
                                                    // disabled={isFormSubmitting}
                                                >
                                                    Log in
                                                </button>
                                            </div>
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;