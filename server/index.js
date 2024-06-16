const express = require("express");
const cors = require("cors");
const routes = require("./routesHMLG");

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
    origin: "http://localhost:5173"
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`API listening on ${PORT}`);
});