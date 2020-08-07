const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//parse requests of content-type application/json
app.use(bodyParser.json());
app.use(express.static('charts'));

//parse request of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true }));

//simple route
app.get("/", (req,res) => {
	res.json({ message: "Welcome to USPS application." });
});

require("./routes/parcel.routes.js")(app);

//set port, listen for requests
app.listen(3432, () => {
	console.log("Server is running on port 3432.");
});


