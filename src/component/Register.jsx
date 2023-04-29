import React from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebase.config';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        // collect from data
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        //validate the password
        if (!/(?=.*?[A-Z])/.test(password)) {
            setErrorMessage('please at least  add 1 uppercase letter')
            return;
        }

        //get email and password 
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const logUser = result.user;
                console.log(logUser);
                setErrorMessage('');
                setSuccessMessage('has been created successfully');

                emailVerificationMessage(result.user)
            })
            .catch(error => {
                console.error(error.message);
                setSuccessMessage('');
                setErrorMessage(error.message);
            })
    }


    //email verification Message
    const emailVerificationMessage = (user) => {
        sendEmailVerification(user)
        .then(result => {
            console.log(result);
            alert('please verify your email');
        })

    }


    const handelEmailChange = (event) => {
        // console.log(event.target.value)
    }

    const handlePasswordBlur = (event) => {
        // console.log(event.target.value)
    }
    return (
        <div>
            <h1 className='m-3 '>Please  Register</h1>
            <form className='p-5  border rounded' onSubmit={handleSubmit}>
                <input className='m-3' onChange={handelEmailChange} type="email" placeholder='Enter email' id='email' required />
                <br />
                <input className='m-3' onBlur={handlePasswordBlur} type="password" placeholder='Password' id='password' required />
                <br />
                <p className='text-danger'>Massage: {errorMessage}</p>
                <br />
                <p className='text-success'>Message: {successMessage}</p>
                <br />
                <button className='btn btn-primary m-3' type='submit' value='Register'>Register</button>
                <br />
                <p>if  you have already registered, please <span> <Link to='/login'>Login</Link> </span> </p>
            </form>
        </div>
    );
};

export default Register;