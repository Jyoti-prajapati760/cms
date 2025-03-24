const RoleModel = require("../model/role.js");
const express = require("express");

const router = express.Router();

// Fetch all roles
router.get("/role", async (req, resp) => {
    try {
        console.log("Fetching role data...");
        const data = await RoleModel.find(); // Retrieve all roles
        resp.status(200).json(data);
    } catch (error) {
        console.error("Error fetching role data:", error);
        resp.status(500).json({ error: "Internal Server Error" });
    }
});

// Add a new role
router.post("/role", async (req, resp) => {
    try {
        console.log("Saving new role...");
        const data = new RoleModel(req.body);
        await data.save();
        resp.status(201).json(data);
    } catch (error) {
        console.error("Error saving role data:", error);
        resp.status(500).json({ error: "Internal Server Error" });
    }
});

// Update an existing role by ID
router.put("/role/:id", async (req, resp) => {
    try {
        console.log("Updating role data...");
        const updatedRole = await RoleModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRole) {
            return resp.status(404).json({ error: "Role not found" });
        }
        resp.status(200).json(updatedRole);
    } catch (error) {
        console.error("Error updating role data:", error);
        resp.status(500).json({ error: " Server Error" });
    }
});

// Delete a role by ID
router.delete("/role/:id", async (req, resp) => {
    try {
        console.log("Deleting role...");
        const deletedRole = await RoleModel.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            return resp.status(404).json({ error: "Role not found" });
        }
        resp.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        console.error("Error deleting role:", error);
        resp.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
