import React, {useEffect, useRef, useState} from 'react';
import {Container as MapDiv, NaverMap, Marker, useNavermaps} from 'react-naver-maps';
import '../scss/MapTemplate.scss';
import {FaTrash} from 'react-icons/fa';
import {IoMdFlower} from 'react-icons/io';
import Skeleton from '../../layout/jsx/Skeleton.jsx';
import {TRASH_CAN_LOCATION} from '../../../config/host-config.jsx';
import {info} from "sass";

const MapTemplate = () => {
    const navermaps = useNavermaps();
    const [currentPosition, setCurrentPosition] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [markers, setMarkers] = useState([]);
    const [checkedLocations, setCheckedLocations] = useState([]);
    const [infoWindows, setInfoWindows] = useState([]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                setIsLoading(true);
                const location = await getLocation();
                if (location.err === 0) {
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
        };

        fetchLocation();
    }, []);

    const getLocation = async () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
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
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        console.log(markers);
    }, [markers]);

    useEffect(() => {
        console.log(checkedLocations);
    }, [checkedLocations]);

    const getTrashCanLocation = async (e) => {
        const district = e.target.value;
        const checked = e.target.checked;

        if (checked) {
            const response = await fetch(
                `http://localhost:8888/api/maps/garbage-can?value=${district}`,
                {
                    method: 'GET',
                }
            );

            if (response.status === 200) {
                const data = await response.json();
                const newMarkers = data.map((marker) => ({
                    ...marker,
                    infoWindow: new navermaps.InfoWindow({
                        content: `
                                    <div style="padding: 10px; background-color: #fff; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);">
                                        <h3 style="margin: 0 0 5px; font-size: 16px; font-weight: bold; color: #333;">${marker.district}</h3>
                                        <p style="margin: 0; font-size: 14px; color: #666;">
                                            <span style="display: block; margin-bottom: 3px;">📍 ${marker.location}</span>
                                            <span>🗑️ ${marker.type}</span>
                                        </p>
                                    </div>
                                `,
                    }),
                }));
                setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
                setCheckedLocations((prevLocations) => [...prevLocations, district]);
            }
        } else {
            setMarkers((prevMarkers) =>
                prevMarkers.filter((marker) => marker.district !== district)
            );
            setCheckedLocations((prevLocations) =>
                prevLocations.filter((location) => location !== district)
            );
        }
    };

    const closeInfoWindows = () => {
        infoWindows.forEach((infoWindow) => {
            infoWindow.close();
        });
        setInfoWindows([]);
    }

    useEffect(() => {
        if (checkedLocations.length === 0) {
            setMarkers([]);
        }
    }, [checkedLocations]);

    const locationListClickHandler = (e) => {
        // 클릭된 요소가 input이 아니면 실행하지 않음
        if (e.target.tagName.toLowerCase() !== 'input') {
            const input = e.currentTarget.querySelector('input[type="checkbox"]');
            if (input) {
                // input 요소의 checked 속성을 변경하여 체크 상태를 반전시킴
                input.checked = !input.checked;
                // 변경된 체크 상태에 따라 이벤트 처리
                getTrashCanLocation({target: input}); // getTrashCanLocation 함수 호출
            }
        }
    };

    const locations = [
        {name: '관악구', value: 'trash-can-gwanak'},
        {name: '동작구', value: 'trash-can-dongjak'},
        {name: '영등포구', value: 'trash-can-yeongdeungpo'},
        {name: '용산구', value: 'trash-can-yongsan'},
    ];

    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
            const listener = navermaps.Event.addListener(mapRef.current, 'click', () => {
                closeInfoWindows();
            });

            return () => {
                navermaps.Event.removeListener(listener);
            };
        }
    }, []);

    return (
        <div className={'map-area'}>
            <div className="btn-filter-group">
                <div className="trash-can-dropdown" ref={dropdownRef}>
                    <FaTrash className={'btn-trash-can'} onClick={toggleDropdown}/>
                    <ul className={`trash-can-dropdown-menu ${isOpen ? 'active' : ''}`}>
                        {locations.map((location) => (
                            <li key={location.value} onClick={locationListClickHandler}>
                                {location.name}{' '}
                                <input
                                    type="checkbox"
                                    value={location.value}
                                    name={location.name}
                                    onChange={getTrashCanLocation}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <IoMdFlower className={'btn-flower'}/>
            </div>
            {isLoading ? (
                <Skeleton/>
            ) : (
                <NaverMap defaultCenter={currentPosition} defaultZoom={15} ref={mapRef} onClick={closeInfoWindows}>
                    {currentPosition && <Marker position={currentPosition}/>}
                    {markers
                        .map((marker, index) => (
                            <Marker
                                key={index}
                                position={new navermaps.LatLng(marker.latitude, marker.longitude)}
                                onClick={(e) => {
                                    closeInfoWindows();
                                    const markerInstance = new navermaps.Marker({
                                        position: new navermaps.LatLng(marker.latitude, marker.longitude),
                                    });
                                    marker.infoWindow.open(mapRef.current, markerInstance);
                                    setInfoWindows([marker.infoWindow]);
                                }}
                            />
                        ))}
                </NaverMap>
            )}
        </div>
    );
};

export default MapTemplate;