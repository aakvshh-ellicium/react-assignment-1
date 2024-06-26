import React, { useEffect, useMemo, useState } from 'react'
import styles from './Login.module.css'
import LoginIcon from '../../assets/stethoscope.svg'
import LoginImage from '../../assets/login-image.svg'
import { CiMail } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { readUserInformation } from '../../app/features/admin/adminSlice';
import toast from 'react-hot-toast';
import { loginUser } from '../../app/features/login/loginUserSlice';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state => state.user);

    // const [errors, setErrors] = useState({});
    // const memoizedUser = useMemo(() => user, [user]);

    const setLocalStorage = (token) => {
        localStorage.setItem('token', token)
    }  

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const enteredEmail = formData.get('email');
        const enteredPassword = formData.get('password');

        console.log(enteredEmail)
        console.log(enteredPassword)

        const validationErrors = {};

        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.(?:[a-zA-Z]{2,}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)$/i;
        const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        
        
        
        if (!enteredEmail.trim()) {
            validationErrors.email = "Email is required";
            toast.error(validationErrors.email);

        } else if (!emailPattern.test(enteredEmail)) {
            validationErrors.email = "Email is not valid";
            toast.error(validationErrors.email);

        }
        if (!enteredPassword.trim()) {
            validationErrors.password = "Password is required";
            toast.error(validationErrors.password);

        } 
        // setErrors(validationErrors);

        
        // console.log(usersData)
        if (Object.keys(validationErrors).length === 0) {
            const action = await dispatch(loginUser({
                Email: enteredEmail,
                Password: enteredPassword
            }))
            const {payload} = action;
            if (payload && payload.token){
                setLocalStorage(payload.token);
                toast.success('Login successful')
                if (enteredEmail === 'admin@gmail.com' && enteredPassword === '1234'){
                    navigate('/dashboard/admin')
                } else {
                    navigate('/personal-info')

                }
            }

        }

    }


    // useEffect(() => {
    //     if (memoizedUser.token){
    //         setLocalStorage(memoizedUser.token)

    //         if (memoizedUser.email === 'admin@gmail.com' && memoizedUser.password === '1234'){
    //             navigate('/dashboard/admin')
    //         }
    //     } else {
    //         navigate('/login');
    //     }

    // }, [memoizedUser, navigate])



  return (
    <section>
        <div className={styles.wrapper}>
            <div className={styles.infoSection}>
                <div className={styles.title}>
                    <img src={LoginIcon} className={styles.loginIcon} alt="" />
                    <h1>Login</h1>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <CiMail className={styles.inputImage} />
                        <input name='email' type="email" className={styles.inputField} placeholder='Email Address' />
                    </div>
                    <div>
                        <IoKeyOutline className={styles.inputImage} />
                        <input name='password' type="password" className={styles.inputField} placeholder='Password' />
                    </div>
                    <br />
                    <button className={styles.loginBtn} type='submit'>Login</button>
                </form>
                <br />
                <p>Don't have an account? <Link to='/sign-up'><span className={styles.action}>Sign-up</span></Link></p>
            </div>
            <div className={styles.imageSection}>
                <img src={LoginImage} className={styles.loginImage} alt="" />
            </div>
        </div>
    </section>
  )
}

export default Login