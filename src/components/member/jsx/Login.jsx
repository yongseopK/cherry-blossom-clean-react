import React from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL, LOGIN_URL} from "../../../config/host-config.jsx";
import header from "../../layout/jsx/Header.jsx";

const Login = () => {

    const redirection = useNavigate();

    const fetchLoginProcess = async () => {
        const response = await axios.post(
            API_BASE_URL + LOGIN_URL,
            {headers: {"Content-Type": "Application/json"},}
        )
    };
    return (
        <div>

        </div>
    );
};

export default Login;