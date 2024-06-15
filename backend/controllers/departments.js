"use strict";

const departmentsRouter = require("express").Router();
const dbConn = require("../utils/db");

// TODO Update all missing x to x missing
// TODO Decapitalize parameter names in error messages
// TODO Check for null after trimming strings

departmentsRouter.get("/", async (request, response) => {
    const departments = await dbConn.query("SELECT * FROM department");
    return response.json(departments);
});

departmentsRouter.get("/count", async (request, response) => {
    const departmentCount = await dbConn.query(
        "SELECT COUNT(*) as count FROM department"
    );
    return response.json(departmentCount[0].count);
});

departmentsRouter.get("/:id", async (request, response) => {
    const { id } = request.params;

    if (!id instanceof Number || id % 1 !== 0) {
        return response.status(400).json({
            error: "parameter 'id' must be a number.",
        });
    }

    const departmentWithId = await dbConn.query(
        "SELECT * FROM department WHERE id=?",
        [id]
    );
    if (departmentWithId.length === 0) {
        return response.status(404).json({
            error: "A department with that id does not exist",
        });
    }

    const [department] = departmentWithId;

    return response.json(department);
});

departmentsRouter.get("/courses/:id", async (req, res) => {
    const departmentId = req.params.id;
    const courses =
        await dbConn.query(`SELECT department_id,name as department_name,course.id as course_id,course.code as course_code, title as course_title 
                        FROM department
                        JOIN course ON department.id = course.department_id where department_id = ?;`,[
                            departmentId
                        ]);
    return res.json(courses);
});

departmentsRouter.get("/courses/count", async (request, response) => {
    const countQuery = `SELECT department.name, department.id as department_id, COUNT(course.code) as count 
                        FROM department 
                        LEFT JOIN course ON course.department_id = department.id 
                        GROUP BY department.id
                        ORDER BY department.id;`;
    const coursesCount = await dbConn.query(countQuery);
    return response.json(coursesCount);
});

departmentsRouter.get("/:id/instructors/count", async (request, response) => {
    const departmentId = request.params.id;
    const countQuery = `SELECT COUNT(instructor.id) as count
                        FROM instructor 
                        WHERE instructor.department_id = ?`;
    const instructorsCount = await dbConn.query(countQuery, [departmentId]);
    return response.json(instructorsCount[0].count);
});

departmentsRouter.get("/:id/students/count", async (request, response) => {
    const departmentId = request.params.id;
    const countQuery = `SELECT COUNT(student.roll) as count
                        FROM student
                        JOIN programme ON student.programme_id = programme.id
                        WHERE programme.department_id = ?`;
    const studentsCount = await dbConn.query(countQuery, [departmentId]);
    return response.json(studentsCount[0].count);
});

departmentsRouter.get("/:id/courses/count", async (request, response) => {
    const departmentId = request.params.id;
    const countQuery = `SELECT COUNT(course.id) as count
                        FROM course 
                        WHERE course.department_id = ?`;
    const coursesCount = await dbConn.query(countQuery, [departmentId]);
    return response.json(coursesCount[0].count);
});

departmentsRouter.post("/", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    let { name } = request.body;

    if (!name) {
        return response.status(400).json({
            error: "name missing in request body",
        });
    }

    name = name.trim();

    if (!name || name.length < 2) {
        return response.status(400).json({
            error: "name cannot be less than 2 characters long",
        });
    }

    const departmentWithName = await dbConn.query(
        "SELECT * FROM department WHERE name=?",
        [name]
    );
    if (departmentWithName.length != 0) {
        return response.status(409).json({
            error: "A department with that name already exists",
        });
    }

    const res = await dbConn.query("INSERT INTO department (name) VALUES (?)", [
        name,
    ]);
    return response.status(201).json({
        id: res.insertId,
    });
});

departmentsRouter.put("/:id", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { id } = request.params;
    const { new_name } = request.body;

    if (!id instanceof Number || id % 1 !== 0) {
        return response.status(400).json({
            error: "parameter 'id' must be a number.",
        });
    }

    if (!new_name) {
        return response.status(400).json({
            error: "new_name missing in request body",
        });
    }

    new_name = new_name.trim();

    if (!new_name || new_name.length < 2) {
        return response.status(400).json({
            error: "new_name cannot be less than 2 characters long",
        });
    }

    const departmentWithId = await dbConn.query(
        "SELECT * FROM department WHERE id=?",
        [id]
    );
    if (departmentWithId.length === 0) {
        return response.status(404).json({
            error: "A department with that id does not exist",
        });
    }

    const departmentWithName = await dbConn.query(
        "SELECT * FROM department WHERE name=?",
        [new_name]
    );
    if (departmentWithName.length != 0) {
        return response.status(409).json({
            error: "A department with that name already exists",
        });
    }

    await dbConn.query("UPDATE department SET name=? WHERE id=?", [
        new_name,
        id,
    ]);
    return response.status(200).end();
});

departmentsRouter.delete("/:id", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { id } = request.params;

    if (!id instanceof Number || id % 1 !== 0) {
        return response.status(400).json({ error: "'id' must be a number." });
    }

    const departmentWithId = await dbConn.query(
        "SELECT * FROM department WHERE id=?",
        [id]
    );
    if (departmentWithId.length === 0) {
        return response.status(404).json({
            error: "A department with that id does not exist",
        });
    }

    await dbConn.query("DELETE FROM department WHERE id=?", [id]);
    return response.status(204).end();
});

module.exports = departmentsRouter;
