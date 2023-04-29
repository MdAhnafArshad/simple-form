import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase/firebase.config';


const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [btnShowPass, setBtnShowPass] = useState(true);

    //useRef react hooks
    const emailRef = useRef();

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        

        //password validation
        if(!/(?=.*[A-Z])/.test(password)){
            setError("Please enter a valid password")
            return;
        }
        
        // firebase auth signing 
        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedIn = result.user;
            console.log(loggedIn);
            setSuccess('user logged in successfully')
            setError('')

        })
        .catch(error => {
            setError(error.message);
            setSuccess('');
        })

    }


    //new handler to get data from mail
    const  handleResetPassword = event => {
        console.log(emailRef.current.value);
        const email = emailRef.current.value;
        if(!email){
            alert('Please provide a valid Email Address');
            return
        }
        sendPasswordResetEmail(auth, email)
        .then( () => {
            alert('please check your email address');
        })
        .catch(error =>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage, errorCode);
        })

    }



    //show password
    const handleBtnShowPass = () =>{
        setBtnShowPass(!btnShowPass)
        console.log('clicked me ffffffff')
    }

    return (
        <div>
            <h2>Login</h2>

            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" ref={emailRef} type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type={btnShowPass?"password":'text'} placeholder="Password" />
                </Form.Group>
                <Button onClick={handleBtnShowPass} className="btn btn-primary m-3">show pass</Button>
                <Button className='mb-3' variant="primary" type="submit">
                    Submit
                </Button>
                <p className='text-success'>{success}</p>
                <p className='text-danger'>{error}</p>
            </Form>
            <p>if you have forgat your password, please <button onClick={handleResetPassword} className='btn btn-link'>Reset_password</button> </p>
            <br />
            <p>if you  don't have a registered please, <span>{<Link to="/register">register</Link>}</span></p>
        </div>
    );
};

export default Login;