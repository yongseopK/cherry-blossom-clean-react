import React, {useEffect} from "react";
import MapTemplate from "./components/blossom-map/jsx/MapTemplate.jsx";
import {NavermapsProvider} from "react-naver-maps";
import {NAVER_MAP_CLIENT_ID} from "./config/host-config.jsx";
import {Container as MapDiv, NaverMap, Marker, useNavermaps} from 'react-naver-maps'
import Header from "./components/layout/jsx/Header.jsx";
import {Route, Routes} from "react-router-dom";
import Login from "./components/member/jsx/Login.jsx";
import Register from "./components/member/jsx/Resister.jsx";

function App() {

    return (
        <Routes>
            <Route path={"/"} element={<Main/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/login"} element={<Login/>}/>
        </Routes>

    )
}

export const Main = () => {

    useEffect(() => {
        document.title = '메인 페이지';
    }, []);
    return (
        <NavermapsProvider
            ncpClientId={NAVER_MAP_CLIENT_ID}
        >
            <Header/>
            <MapDiv
                style={{
                    width: '100%',
                    height: '50vh',
                }}
            >
                <MapTemplate/>
            </MapDiv>
        </NavermapsProvider>
    );
}

export default App
