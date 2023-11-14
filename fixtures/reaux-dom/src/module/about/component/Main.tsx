import React from "react";
import {actions} from "../index";
import {AllState} from "../../../utils/state";
import {useDispatch, useSelector} from "react-redux";

export default function Main() {
    const dispatch = useDispatch();
    const {name} = useSelector((state: AllState)=>({name: state.about.name}));

    return (
        <div>
            {name}
            <button onClick={() => dispatch(actions.test())}>push</button>
            <button onClick={() => {throw new Error('This is a simulated error!')}}>simulated error</button>
            <button onClick={() => {new Promise((resolve, reject) => {reject(new Error('This is an unhandled rejection.'))})}}>simulated promise error</button>
            <button onClick={() => dispatch(actions.setState({name: "new about"}))}>reset name</button>
            <button onClick={() => dispatch(actions.resetState(["name"]))}>reset name</button>
        </div>
    );
}
