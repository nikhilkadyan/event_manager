import React, { useEffect, useState } from 'react';
import swal from "sweetalert";
import './style.scss';

import axios from 'axios';
import api_url from '../../Service/api';
import { FaChevronCircleLeft, FaChevronCircleRight, FaUserClock, FaMedal, FaTrophy } from 'react-icons/fa';

const Schedule = () => {
    const [ slots, setSlots ] = useState(null);
    const [ curSlot, setCurSlot ] = useState([]);
    const [ day, setDay ] = useState(1);
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        const fetchSlots = () => {
            axios.get(api_url + '/session').then(resp => {
                if(resp && resp.data){
                    let raw = resp.data;
                    let slots = {};
                    raw.forEach(el => {
                        if(slots[el.slot.id]){
                            slots[el.slot.id]['sessions'].push(el) 
                        } else {
                            slots[el.slot.id] = {
                                slot: el.slot,
                                sessions: [el]
                            }
                        }
                    });
                    let arr = [];
                    Object.keys(slots).forEach((s) => {
                        arr.push(slots[s]);
                    });
                    arr.sort((a, b) => {
                        return a.slot.dayInt - b.slot.dayInt
                    })
                    setSlots(arr);
                    setCurSlot(arr.filter(a => a.slot.dayInt === 1));
                }
            })
        }
        if(slots){ 
            sessionStorage.setItem("slots", JSON.stringify(slots))
        } else {
            let cache = JSON.parse(sessionStorage.getItem("slots"));
            if(cache){
                setSlots(cache)
                setCurSlot(cache.filter(a => a.slot.dayInt === 1));
            } else {
                fetchSlots();
            }
        }
        let user = JSON.parse(sessionStorage.getItem("user"));
        if(user){
            setUser(user)
        }
    }, [slots])

    const nextDay = () => {
        if(day < 7){
            let curDay = day + 1;
            setDay(curDay);
            setCurSlot(slots.filter(a => a.slot.dayInt === curDay));
        }
    }

    const prevDay = () => {
        if(day > 1){
            let curDay = day - 1;
            setDay(curDay);
            setCurSlot(slots.filter(a => a.slot.dayInt === curDay));
        }
    }

    const getDayName = () => {
        let name = ""
        if (day === 1) {
            name = "Monday"
        } else if (day === 2){
            name = "Tuesday"
        } else if (day === 3){
            name = "Wednesday"
        } else if (day === 4){
            name = "Thrusday"
        } else if (day === 5){
            name = "Friday"
        } else if (day === 6){
            name = "Saturday"
        } else if (day === 7){
            name = "Sunday"
        } else {
            name = "Wops"
        }
        return <>{name}</>
    }

    const showSessionInfo = (data) => {
        let info = document.createElement("div");
        info.style.textAlign = "justify";
        info.style.fontSize = "13px";
        info.style.fontWeight = "200";
        info.innerText = data.content.abstract;
        swal({
            title: data.type.name.toUpperCase() + " in Room " + data.room.name,
            // text: data.content.title,
            content: info,
            buttons: {
                confirm: "Close",
            }
          });
    }

    const showUpdateWindow = (data) => {
        swal({
            text: data.content.title,
            content: "input",
            button: {
              text: "Enter new title!",
              closeModal: false,
            },
        }).then(title => {
            if (!title) return false;
            return axios.post(api_url + '/content/update_title', JSON.stringify({
                token: user.token,
                id: data.content.contentId,
                title: title
            }))
        }).then(() => {
            sessionStorage.removeItem("slots")
            setSlots(null)
            swal({
                title: "Success",
                text: "Title successfully updated",
              });
        }).catch(err => {
            if (err) {
                if(err.response && err.response.data){
                    swal("Ops!", err.response.data, "error");
                } else {
                    swal("Ops!", "The AJAX request failed!", "error");
                }
              } else {
                swal.stopLoading();
                swal.close();
              }
        })
    }

    return (
        <div className="event_container">
            <div className="day_control">
                <button onClick={() => prevDay()} disabled={(day === 1) ? true : false}><FaChevronCircleLeft /> <span>Prev</span></button>
                <span className="curr_day">Day {day} {getDayName()}</span>
                <button onClick={() => nextDay()} disabled={(day === 7) ? true : false}><span>Next</span> <FaChevronCircleRight /></button>
            </div>
            <div className="slots_container">
                {curSlot.map((s, key) => (
                    <div key={key} className="slot">
                        <div className="slot_title">
                            <FaUserClock /> <span>{s.slot.startHour}:{s.slot.startMinute !== 0 ? s.slot.startMinute : "00"} - {s.slot.endHour}:{s.slot.endMinute !== 0 ? s.slot.endMinute : "00"}</span>
                        </div>
                        <div className="slot_sessions">
                            {s.sessions.map((el, k) => (
                                <div key={k} className="session">
                                    {(el.content && el.content.title ) && (
                                        <h4>
                                            {(el.content && el.content.award === "HONORABLE_MENTION") && <FaMedal />}
                                            {(el.content && el.content.award === "BEST_PAPER") && <FaTrophy />}
                                            {" "}
                                            {el.content.title}
                                        </h4>)}
                                    <div className="footer">
                                        <div className="info">
                                            <div style={{textTransform: "uppercase"}}>
                                                {el.type.name}
                                            </div>
                                            {" "}
                                            <div>
                                                {el.chair && (" By " + el.chair.name)}
                                            </div>
                                        </div>
                                        <div>
                                            {(user && user.admin === 1) && <button onClick={() => showUpdateWindow(el)}>Update</button>}
                                            {(el.content && el.content.abstract) && (
                                                <button onClick={() => showSessionInfo(el)}>Details</button>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Schedule;
