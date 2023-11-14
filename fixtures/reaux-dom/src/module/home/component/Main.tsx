import React from "react";
import {AllState} from "../../../utils/state";
import {useDispatch, useSelector} from "react-redux";
import {View} from "../../about";
import {actions} from "../index";

export default function Main(){
    const dispatch = useDispatch();
    const {name} = useSelector((state: AllState)=>({name: state.home.name}));

    return (
        <div style={{height: "200vh"}}>
            {name}
            <button
                onClick={() => {
                    dispatch(actions.test());
                }}
            >
                Test
            </button>
            <View />
        </div>
    );
}