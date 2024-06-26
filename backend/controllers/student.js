"use strict";

const studentRouter = require("express").Router();
const dbConn = require("../utils/db");
const validator = require("email-validator");

studentRouter.get("/", (req, res) => {
    console.log(req.student);
    return res.json("HIIIIII from server");
});

studentRouter.get("/semesters", async (request, response) => {
    const { student } = request;
    let roll = student.roll;

    if (!roll instanceof Number || roll % 1 != 0) {
        return response.status(400).json({
            error: "roll must be an integer",
        });
    }

    const studentWithRoll = await dbConn.query(
        "SELECT * FROM student WHERE roll=?",
        [roll]
    );

    if (studentWithRoll.length === 0) {
        return response.status(404).json({
            error: "A student with that roll number does not exist",
        });
    }

    const semestersQuery = `SELECT DISTINCT semester_number
        FROM takes 
        WHERE student_roll=?;`;

    const semesters = await dbConn.query(semestersQuery, [roll]);

    return response.json(semesters);
});

studentRouter.get("/cpi", async (request, response) => {
    const { student } = request;
    let roll = student.roll;

    if (!roll instanceof Number || roll % 1 != 0) {
        return response.status(400).json({
            error: "roll must be an integer",
        });
    }

    const studentWithRoll = await dbConn.query(
        "SELECT * FROM student WHERE roll=?",
        [roll]
    );

    if (studentWithRoll.length === 0) {
        return response.status(404).json({
            error: "A student with that roll number does not exist",
        });
    }

    const cpiQuery = `WITH max_grades(course_id, grade) AS (
        SELECT course_id, MAX(grade)
        FROM takes
        WHERE student_roll=?
        GROUP BY course_id
        ) SELECT AVG(grade) AS cpi FROM max_grades;`;

    const [cpi] = await dbConn.query(cpiQuery, [roll]);

    if (!cpi["cpi"]) {
        return response.status(404).json({
            error: `Student ${roll} takes no courses`,
        });
    }

    return response.json(cpi);
});


studentRouter.get("/spi/:semester_number", async (request, response) => {
    const { student } = request;
    let roll = student.roll;
    let { semester_number } = request.params;

    if (!roll instanceof Number || roll % 1 != 0) {
        return response.status(400).json({
            error: "roll must be an integer",
        });
    }

    const studentWithRoll = await dbConn.query(
        "SELECT * FROM student WHERE roll=?",
        [roll]
    );

    if (studentWithRoll.length === 0) {
        return response.status(404).json({
            error: "A student with that roll number does not exist",
        });
    }

    if (!semester_number) {
        return response.status(400).json({
            error: "semester_number missing in request parameters",
        });
    }

    semester_number = semester_number.trim();

    if (!semester_number instanceof Number || semester_number % 1 != 0) {
        return response.status(400).json({
            error: "semester_number must be an integer",
        });
    }

    const spiQuery = `SELECT AVG(grade) AS spi
    FROM takes 
    WHERE student_roll=? AND semester_number=?;`;

    const [spi] = await dbConn.query(spiQuery, [roll, semester_number]);

    if (!spi["spi"]) {
        return response.status(404).json({
            error: `Student ${roll} takes no courses in semester ${semester_number}`,
        });
    }

    return response.json(spi);
});

module.exports = studentRouter;