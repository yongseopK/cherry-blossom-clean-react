import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL, LOGIN_URL} from "../../../config/host-config.jsx";
import "../scss/Login.scss";
import {ROLE, TOKEN, USERNAME} from "../../../util/login-util.jsx";

const Login = () => {

    const redirection = useNavigate();

    const enterHandler = async (e) => {
        if (e.code === "Enter") {
            await fetchLoginProcess();
        }
    };

    const fetchLoginProcess = async () => {

        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');


        if (emailInput.value === "" || passwordInput.value === "") {
            alert("정보를 입력해주세요");
            return;
        }

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({
                    email: emailInput.value,
                    password: passwordInput.value,
                }),
                {
                    headers: {"Content-Type": "Application/json"}
                },
            );

            if (response.status === 200) {
                const {token, userName, role} = await response.data;

                localStorage.setItem(TOKEN, token);
                localStorage.setItem(USERNAME, userName);
                localStorage.setItem(ROLE, role);

                redirection('/');
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                alert(err.response.data);
            }
        }


    };
    return (
        <div className={"login-component"}>
            <div className={"member-background"}></div>
            <div className="login-form">
                <span className={"login-title"}>로그인</span>
                <div className={"input-area"}>
                    <input id={"email"} className={"login-input"} type="text" placeholder={"이메일"} onKeyUp={enterHandler}/>
                    <input id={"password"} className={"login-input"} type="password" placeholder={"비밀번호"}
                           onKeyUp={enterHandler}/>
                </div>
                <div className="auto-login-forgot-password">
                    <label className={"auto-login-label"}>
                        <input type="checkbox"/>
                        자동 로그인
                    </label>
                    <Link className={"forgot-password"} to={"/forgot-password"}>비밀번호를 잊으셨나요?</Link>
                </div>
                <button className={"btn-login-process"} onClick={fetchLoginProcess}>Login</button>
                <span className={"intend-register"}>가입된 회원이 아니신가요? <Link to={"/register"}>회원가입</Link></span>
                <div className={"social-login-title"}>
                    <div></div>
                    <span>간단로그인</span>
                    <div></div>
                </div>

                <div className="social-login">
                    <img src={'images/googleLogin.png'} alt="google login"/>
                    <img src={'images/kakaoLogin.png'} alt="google login"/>
                </div>


            </div>
        </div>


    );
};

export default Login;