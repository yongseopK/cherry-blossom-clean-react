import React, {useState} from 'react';
import '../scss/Header.scss';
import {Link} from "react-router-dom";
import {MdLogin} from "react-icons/md";
import {IconContext} from "react-icons";
import {IoMenu} from "react-icons/io5";

const Header = () => {

    const [isLogin, setIsLogin] = useState(false);
    return (
        <>
            <header id={"header"}>
                <nav id={"nav-box"}>

                    <div className={"logo-box"}>
                        <Link to="/" className={"home-link"}>Clean Cherry Blossom</Link>
                    </div>
                    {
                        isLogin ? (
                            <IoMenu className={"btn-menu-mobile"}/>
                        ) : (
                            <Link to={"/login"}>
                                <MdLogin className={"btn-login-mobile"}/>
                            </Link>
                        )
                    }
                </nav>
            </header>
        </>
    );
};

export default Header;