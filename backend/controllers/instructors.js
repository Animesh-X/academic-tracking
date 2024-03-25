const instructorsRouter = require("express").Router();
const dbConn = require("../utils/db");

instructorsRouter.get("/", async (request, response) => {
    const instructors = await dbConn.query("SELECT * FROM instructor");
    return response.json(instructors);
});

instructorsRouter.post("/", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    let { name, designation, dept_name } = request.body;

    if (!name) {
        return response.status(400).json({
            error: "name missing in request body",
        });
    }

    if (!designation) {
        return response.status(400).json({
            error: "designation missing in request body",
        });
    }

    if (!dept_name) {
        return response.status(400).json({
            error: "dept_name missing in request body",
        });
    }

    name = name.trim();
    designation = designation.trim();
    dept_name = dept_name.trim();

    if (name.length < 2) {
        return response.status(400).json({
            error: "name cannot be less than 2 characters long",
        });
    }

    if (designation.length < 2) {
        return response.status(400).json({
            error: "designation cannot be less than 2 characters long",
        });
    }

    if (dept_name.length < 2) {
        return response.status(400).json({
            error: "dept_name cannot be less than 2 characters long",
        });
    }

    const department = await dbConn.query(
        "SELECT * FROM department WHERE name=?",
        [dept_name]
    );
    if (department.length === 0) {
        return response.status(400).json({
            error: "Invalid dept_name",
        });
    }

    const res = await dbConn.query(
        "INSERT INTO instructor (name, designation, dept_name) VALUES (?, ?, ?)",
        [name, designation, dept_name]
    );
    return response.status(201).json({
        id: res.insertId,
    });
});

instructorsRouter.put("/:id", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { id } = request.params;
    let { name, designation, dept_name } = request.body;

    if (!name) {
        return response.status(400).json({
            error: "name missing in request body",
        });
    }

    if (!designation) {
        return response.status(400).json({
            error: "designation missing in request body",
        });
    }

    if (!dept_name) {
        return response.status(400).json({
            error: "dept_name missing in request body",
        });
    }

    name = name.trim();
    designation = designation.trim();
    dept_name = dept_name.trim();

    if (name.length < 2) {
        return response.status(400).json({
            error: "name cannot be less than 2 characters long",
        });
    }

    if (designation.length < 2) {
        return response.status(400).json({
            error: "designation cannot be less than 2 characters long",
        });
    }

    if (dept_name.length < 2) {
        return response.status(400).json({
            error: "dept_name cannot be less than 2 characters long",
        });
    }

    const department = await dbConn.query(
        "SELECT * FROM department WHERE name=?",
        [dept_name]
    );
    if (department.length === 0) {
        return response.status(400).json({
            error: "Invalid dept_name",
        });
    }

    await dbConn.query(
        "UPDATE instructor SET name=?, designation=?, dept_name=? WHERE id=?",
        [name, designation, dept_name, id]
    );
    return response.status(200).end();
});

instructorsRouter.delete("/:id", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { id } = request.params;
    await dbConn.query("DELETE FROM instructor WHERE id=?", [id]);
    return response.status(204).end();
});

module.exports = instructorsRouter;
