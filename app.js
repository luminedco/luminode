const config = require("./config.json"),
    express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    morgan = require("morgan"),
    rootRoutes = require("./routes/rootRoutes");

mongoose.connect((config.mongo || "mongodb://127.0.0.1/lumined"), {
    useNewUrlParser: true,
    useFindAndModify: false
}, (err, db) => {
    if (err) {
        console.error("Unable to connect to the database", (err.message || err));
        process.exit(0);
    } else console.log("Connected to DB")
});
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, CF-Connecting-IP");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


app.use(rootRoutes);

app.use((req, res, next) => {
    return res.status(404).json({
        "error": "Endpoint not found."
    });
});


app.listen((parseInt(config.port) || 8080), () => {
    console.log(`Server listening on port ${config.port || 8080}`);
});