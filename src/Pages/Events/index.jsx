import React, { useEffect, useState } from 'react'
import './style.scss'

import axios from 'axios';
import api_url from '../../Service/api';

const Events = () => {
    const [ slots, setSlots ] = useState([]);
    const [ curSlot, setCurSlot ] = useState([]);
    const [ day, setDay ] = useState(1);

    useEffect(() => {
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
                console.log(arr)
                setCurSlot(arr.filter(a => a.slot.dayInt === day));
            }
        })
    // eslint-disable-next-line
    }, [])

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

    return (
        <div className="event_container">
            <div className="day_control">
                <button onClick={() => prevDay()} disabled={(day === 1) ? true : false}>Prev</button>
                <span>Day {day} {getDayName()}</span>
                <button onClick={() => nextDay()} disabled={(day === 7) ? true : false}>Next</button>
            </div>
            <div className="slots_container">
                {curSlot.map((s, key) => (
                    <div key={key} className="slot">
                        <div className="slot_title">
                            {s.slot.startHour}:{s.slot.startMinute !== 0 ? s.slot.startMinute : "00"} - {s.slot.endHour}:{s.slot.endMinute !== 0 ? s.slot.endMinute : "00"}
                        </div>
                        <div className="slot_sessions">
                            {s.sessions.map((session, k) => (
                                <div className="session" key={k}>
                                    <h4>session</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Events;
