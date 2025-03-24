const MarksheetModel = require("../model/marksheet.js");
const express = require("express");

const router = express.Router();

// Fetch all Marksheets
router.get("/marksheet", async (req, resp) => {
    try {
        console.log("Fetching Marksheet data...");
        const data = await MarksheetModel.find(); // Retrieve all Marksheets
        resp.status(200).json(data);
    } catch (error) {
        console.error("Error fetching Marksheet data:", error);
        resp.status(500).json({ error: "Internal Server Error" });
    }
});

// Add a new Marksheet
router.post("/marksheet", async (req, resp) => {
    try {
        console.log("Saving new Marksheet...");
        const data = new MarksheetModel(req.body);
        await data.save();
        resp.status(201).json(data);
    } catch (error) {
        console.error("Error saving Marksheet data:", error);
        resp.status(500).json({ error: "Internal Server Error" });
    }
});

// Update an existing Marksheet by ID
router.put("/marksheet/:id", async (req, resp) => {
    try {
        console.log("Updating Marksheet data...");
        const updatedMarksheet = await MarksheetModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMarksheet) {
            return resp.status(404).json({ error: "Marksheet not found" });
        }
        resp.status(200).json(updatedMarksheet);
    } catch (error) {
        console.error("Error updating Marksheet data:", error);
        resp.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete a Marksheet by ID
router.delete("/marksheet/:id", async (req, resp) => {
    try {
        console.log("Deleting Marksheet...");
        const deletedMarksheet = await MarksheetModel.findByIdAndDelete(req.params.id);
        if (!deletedMarksheet) {
            return resp.status(404).json({ error: "Marksheet not found" });
        }
        resp.status(200).json({ message: "Marksheet deleted successfully" });
    } catch (error) {
        console.error("Error deleting Marksheet:", error);
        resp.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
