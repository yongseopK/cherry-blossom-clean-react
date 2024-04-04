import React, { useState, useEffect, useRef } from 'react';
import '../scss/Dropdown.scss';
import { IoMenu } from 'react-icons/io5';
import {redirect, useNavigate} from "react-router-dom";

const Dropdown = ({login}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const redirection = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const logoutHandler = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className="dropdown" ref={dropdownRef}>
            <IoMenu className="menu-btn" onClick={toggleDropdown} />
            <ul className={`dropdown-menu ${isOpen ? 'active' : ''}`}>
                <li>벚꽃 명소/개화시기 제보</li>
                <li>쓰레기통 위치 제보</li>
                <li>회원정보</li>
                <li onClick={logoutHandler}>로그아웃</li>
            </ul>
        </div>
    );
};

export default Dropdown;