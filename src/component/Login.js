
import { useRef, useState,useEffect } from 'react';
import useAuth from '../hook/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../axioss/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    // const { setAuth } = useAuth()
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"




    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


   

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                } );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const _username= response?.data?._username;
            localStorage.setItem("_username",JSON.stringify(_username))
            // setAuth({ username, password,roles,  accessToken });
            // setUser('');
            // setPwd('');
            navigate(from, {replace : true});
            
           
        } catch (err) {
            // if (!err?.response) {
            //     setErrMsg('No Server Response');
            // } else if (err.response?.status === 400) {
            //     setErrMsg('Missing Username or Password');
            // } else if (err.response?.status === 401) {
            //     setErrMsg('Unauthorized');
            // } else {
            //     setErrMsg('Login Failed');
            // }
            // errRef.current.focus();
            console.log(err)
        }
    }

   

    return (
      <>
       <div className="auth">
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={username}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign In</button>
               
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                <Link to="/register">Register</Link>
                </span>
            </p>
        </section>
        </div>
        </>

    )
}

export default Login