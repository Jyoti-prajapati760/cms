
require("./db/config.js");
const express = require("express");
const multer = require('multer');
const path = require('path');
const cors = require("cors"); 
const User = require("./controls/controlUser.js"); 
const Role = require("./controls/controlRole.js");
const College=require("./controls/controlCollege.js");
const Marksheet=require("./controls/controlMarksheet.js");
const Student=require("./controls/controlStudent.js");

const app = express();
app.use(express.json());
app.use(cors());
// const url = path.join(__dirname,"upload")

// app.use('/api/user', express.static(url));
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, "upload");
//         },
//         filename: (req, file, cb) => {
//             cb(null, file.originalname);
//         }
//     })
// });

// app.use('/user', express.static('upload'));


// Test route
app.get("/", (req, resp) => {
    // console.log(url)
    resp.send("<h1>Run server</h1>");
});

// API routes
app.use("/api", User);
app.use("/api", Role);
app.use("/api", Marksheet);
app.use("/api", Student);
app.use("/api", College);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

