import React from "react";
import "./styles/station.css";

export default function Station(props) {

    return (
    <div class="station">
        <h2>
            {props.name}
        </h2>
    </div>
    );

}