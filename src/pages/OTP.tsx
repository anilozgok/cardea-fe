import React, { useState,  useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function EmailVerification() {
    const { state } = useLocation();
    const email = state.email;
    const navigate = useNavigate();

    const [OTPinput, setOTPinput] = useState(new Array(4).fill(""));
    const inputRefs = useRef(new Array(4).fill(React.createRef()));

    const toastInfo = (toastMethod: string, messageToShow: string) => {
        const method = toastMethod === 'error' ? toast.error : toast.success;

        method(messageToShow, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };



    function verifyOTP() {
        const passcode = parseInt(OTPinput.join(""));
        axios.put("http://localhost:8080/api/v1/auth/verify-passcode", {
            passcode: passcode
        })
            .then((response) => {
                if (response.status === 200) {
                    navigate('/reset-password', { state: { email } });
                } else {
                    toastInfo('error', "Unexpected error occurred. Please try again.");
                }
            })
            .catch((error) => {
                if (error.response.status >= 400 && error.response.status < 600) {
                    toastInfo('error', "The code you have entered is not correct, try again or resend the link");
                } else {
                    toastInfo('error', "An unexpected error occurred. Please try again later.");
                }
            });
    }



    function handleInputChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
        const newOtpInput = [...OTPinput];
        newOtpInput[index] = event.target.value;
        setOTPinput(newOtpInput);

        if (event.target.value && index < OTPinput.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    }

    function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Backspace" && index > 0 && OTPinput[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    }

    return (
        <div className="flex justify-center items-center w-screen h-screen" style={{ backgroundColor: '#FFF' }}>
            <div className="p-6 mx-auto w-full max-w-md rounded-2xl" style={{ backgroundColor: '#FFF' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: '#000' }}>Email Verification</h1>
                <p style={{ color: '#555', textAlign: 'center' }}>We have sent a code to your email {email}</p>
                <form>
                    <div className="flex items-center justify-center space-x-4 my-4">
                        {OTPinput.map((value, index) => (
                            <input
                                key={index}
                                maxLength={1}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    textAlign: 'center',
                                    fontSize: '22px',
                                    borderRadius: '10px',
                                    border: '1px solid #CCC',
                                    outline: 'none',
                                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
                                    backgroundColor: 'white',
                                    color: 'black',
                                    margin: '5px'
                                }}
                                type="text"
                                value={value}
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleInputChange(index, e)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                            />
                        ))}
                    </div>

                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <button
                        type="button"
                        onClick={verifyOTP}
                        style={{
                            width: '100%',
                            padding: '20px',
                            marginTop: '20px',
                            borderRadius: '8px',
                            backgroundColor: '#4A90E2',
                            color: 'white',
                            fontSize: '16px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                    >
                        Verify Account
                    </button>
                </form>
            </div>
        </div>
    );
}
