import React from "react";
import {useState} from "react";
import {render} from "react-dom";
import Station from "./station.js";
import "./styles/stationArea.css";
import "./styles/mainHeading.css";

function StationSelection(props) {
    return (
        <form onSubmit={props.submit}>
            <label>Station CRS</label>
            <input type="text" id="stationCRS"></input>
            <input type="submit"></input>
        </form>
    )
}


export default function App() {
    const [formShowing, setFormShowing] = useState(true);
    const [station, setStation] = useState("");
    const [stations, setStations] = useState([]);

    const formSubmit = (e) => {
        setFormShowing(false);
        const station = document.getElementById("stationCRS");
        const value = station.value;
        fetch(`/departures/${value}`).then(data => data.json()).then(data => {setStations(data.stations); setStation(data.trainStationName)});

    }

    const stationElements = stations.map(place => <Station name={place}/>);

    return (
        <div>
            <h1 class="mainHeading">{station ? station : "Select Station"}</h1>
            {formShowing && <StationSelection submit={formSubmit} />}
            <div class="stationArea">
                {stationElements}
            </div>
            
        </div>
    )
}

const root = document.getElementById("root");
render(<App />, root);
