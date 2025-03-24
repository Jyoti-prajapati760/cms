const CollegeModel = require("../model/college.js");

const express = require("express");

const router = express.Router();

// Fetch all college
router.get("/college", async (req, resp) => {
    try {
        console.log("Fetching college data...");
        const data = await CollegeModel.find(); 
        resp.status(200).json(data);
    } catch (error) {
        console.error("Error fetching college data:", error);
        resp.status(500).json({ error: " Server Error" });
        
    }
});

// Add a new college
router.post("/college", async (req, resp) => {
    try {
        console.log("Saving new college...");
        const data = new CollegeModel(req.body);
        await data.save();
        resp.status(201).json(data);
    } catch (error) {
        console.error("Error saving college data:", error);
        resp.status(500).json({ error: " Server Error" });
    }
});

// Update  college by ID
router.put("/college/:id", async (req, resp) => {
    try {
        console.log("Updating college data...");
        const updatedCollege = await CollegeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCollege) {
            return resp.status(404).json({ error: "college not found" });
        }
        resp.status(200).json(updatedCollege);
    } catch (error) {
        console.error("Error updating college data:", error);
        resp.status(500).json({ error: " Server Error" });
    }
});

// Delete a college by ID
router.delete("/college/:id", async (req, resp) => {
    try {
        console.log("Deleting college...");
        const deletedCollege = await CollegeModel.findByIdAndDelete(req.params.id);
        if (!deletedCollege) {
            return resp.status(404).json({ error: "College not found" });
        }
        resp.status(200).json({ message: "College deleted successfully" });
    } catch (error) {
        console.error("Error deleting college:", error);
        resp.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
