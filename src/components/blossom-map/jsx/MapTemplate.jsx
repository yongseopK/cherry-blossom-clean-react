import React, {useEffect, useState} from 'react';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps'
import '../scss/MapTemplate.scss';
import {FaTrash} from "react-icons/fa";
import {IoMdFlower} from "react-icons/io";
import Skeleton from "../../layout/jsx/Skeleton.jsx";

const MapTemplate = () => {
    const navermaps = useNavermaps();
    const [currentPosition, setCurrentPosition] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                setIsLoading(true);
                const location = await getLocation();
                if(location.err === 0) {
                    setCurrentPosition(new navermaps.LatLng(location.latitude, location.longitude));
                } else {
                    setCurrentPosition(new navermaps.LatLng(37.3595704, 127.105399));
                }
                setIsLoading(false);
                console.log(location.latitude);
                console.log(location.longitude);
            } catch (error) {
                console.error('Error fetching location: ', error);
                setCurrentPosition(new navermaps.LatLng(37.3595704, 127.105399));
                setIsLoading(false);
            }
        }

        fetchLocation();
    }, []);

    const getLocation = async () => {
        return new Promise((resolve, reject) => {
            if(navigator.geolocation) {
                const now = new Date();
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            err: 0,
                            time: now.toLocaleTimeString(),
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    (err) => {
                        resolve({
                            err: -1,
                            latitude: -1,
                            longitude: -1,
                        });
                    },
                    {enableHighAccuracy: true, maximumAge: 2000, timeout: 10000}
                );
            } else {
                reject({error: -2, latitude: -1, longitude: -1});
            }
        });
    }

    return (
        <div className={"map-area"}>
            <div className="btn-filter-group">
                <FaTrash className={"btn-trash-can"} />
                <IoMdFlower className={"btn-flower"} />
            </div>
            {isLoading ? (
                <Skeleton/>
            ) : (
                <NaverMap defaultCenter={currentPosition} defaultZoom={15}>
                    {currentPosition && <Marker position={currentPosition} />}
                </NaverMap>
            )
            }
        </div>
    );
};



export default MapTemplate;