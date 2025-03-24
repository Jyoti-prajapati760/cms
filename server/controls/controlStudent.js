const StudentModel = require("../model/student.js");
const express = require("express");

const router = express.Router();

// Fetch all Students
router.get("/student", async (req, resp) => {
    try {
        console.log("Fetching Student data...");
        const data = await StudentModel.find(); // Retrieve all Students
        resp.status(200).json(data);
    } catch (error) {
        console.error("Error fetching Student data:", error);
        resp.status(500).json({ error: "Internal Server Error" });
    }
});

// Add a new Student
router.post("/student", async (req, resp) => {
    try {
        console.log("Saving new Student...");
        const data = new StudentModel(req.body);
        await data.save();
        resp.status(201).json(data);
    } catch (error) {
        console.error("Error saving Student data:", error);
        resp.status(500).json({ error: " Server Error" });
    }
});

// Update an existing Student by ID
router.put("/student/:id", async (req, resp) => {
    try {
        console.log("Updating Student data...");
        const updatedStudent = await StudentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) {
            return resp.status(404).json({ error: "Student not found" });
        }
        resp.status(200).json(updatedStudent);
    } catch (error) {
        console.error("Error updating Student data:", error);
        resp.status(500).json({ error: " Server Error" });
    }
});

// Delete a Student by ID
router.delete("/student/:id", async (req, resp) => {
    try {
        console.log("Deleting Student...");
        const deletedStudent = await StudentModel.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return resp.status(404).json({ error: "Student not found" });
        }
        resp.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Error deleting Student:", error);
        resp.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
