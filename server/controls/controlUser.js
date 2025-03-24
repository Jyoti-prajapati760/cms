const express = require("express");
const UserModel = require("../model/user.js");
const multer = require("multer"); 
const path = require('path');


const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload"); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); 
    }
});
const upload = multer({ storage: storage });

// router.use('/user', express.static('upload'));

// const url = path.join(__dirname,"upload")

router.use('/user/upload', express.static("upload"));



router.get("/user", async (req, res) => {
    try {
        const data = await UserModel.find();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

// get
router.get("/user/:_id", async (req, res) => {
    try {
        const data = await UserModel.findOne({ _id: req.params._id });
        if (!data) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

// post
router.post("/user", upload.single("image"), async (req, res) => {
    try {
        const userData = { ...req.body };
       
        if (req.file) {
            userData.filepath = req.file.path; // Store image path
            userData.filename = req.file.filename; // Store image path
        }
        // console.log("Image with user data ",userData,req.file.path)
        const data = new UserModel(userData);
        await data.save();
        res.status(201).json(data);
    } catch (error) {
        console.error("Error saving user data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// put
router.put("/user/:_id", async (req, res) => {
    try {
        console.log("Updating user data...", req.params, req.body);

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params._id,  
            { $set: req.body },
            { new: true }  
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Delete 
router.delete("/user/:id", async (req, res) => {
    try {
        const deletedUser = await UserModel.deleteOne({ _id: req.params.id }); 

        if (deletedUser.deletedCount === 0) {  
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




// login api
router.post("/login", async (req, resp) => {
    if (req.body.loginId && req.body.password) {
        try {
            const data = await User.findOne(req.body).select("-password")
            if (data === null) {
                resp.send({ message: "No result found" })
            } else {
                console.log(data)
                resp.send(data)
            }
        } catch (err) {
            console.log("Error in login Api", err)
        }
    } else if (req.body.loginId === "undefined") {
        resp.send({ message: "Enter Email id" })
    } else if (req.body.password === "undefined") {
        resp.send({ message: "Enter Password" })
    } else {
        resp.send({ message: "Enter LoginId And Password" })
    }
})

module.exports = router;
