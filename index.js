const openLDBWS = require("ldbws-json");
const operation = require("ldbws-json/LDBWSOperation");
const requestData = require("ldbws-json/LDBWSRequestData");
const operationInfo = require("ldbws-json/LDBWSOperationInfo");
const express = require("express");
const app = express();
const http = require("http");
const server = http.Server(app);
app.use("/static", express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
    res.status(200);
    res.render("index");
})

app.get("/departures/:crs", (req, res) => {
    const options = Object.assign({}, requestData.Board);
    options.crs = req.params.crs;
    
    let output = {stations: []};
    api.call(operation.GET_DEPARTURE_BOARD_WITH_DETAILS, options).then((board)=>{
        const trainServices = board[info].trainServices;
        output.trainStationName = board[info].locationName
        try{
            trainServices.service.forEach((service) => {
                callingPoints = service.subsequentCallingPoints.callingPointList.callingPoint;
                try {
                    callingPoints.forEach((station) => {
                        if (!output.stations.includes(station.locationName)) {
                            output.stations.push(station.locationName);
                        }
                        
                    })
                } catch (e) {
                    console.log(e);
                }
                
                
            })
            output.message = "Success";
            res.status(200);
            res.contentType("application/json");
            res.send(output);

        } catch (e) {
            output.message = "That is not a valid train station";
            res.status(200);
            res.contentType("application/json");
            res.send(output);

        }
        
    })
})

const api = new openLDBWS(process.env.NATIONAL_RAIL_TOKEN);

const method = operation.GET_DEPARTURE_BOARD_WITH_DETAILS;

const info = operationInfo[method].key;

const options = Object.assign({}, requestData.Board);
options.crs = "HYN";



server.listen(3000, () => {
    console.log("Running on localhost:3000");
})

