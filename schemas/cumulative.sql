CREATE DATABASE academic_tracking;
USE academic_tracking;

CREATE TABLE session (
    id INT PRIMARY KEY AUTO_INCREMENT,
    start_year YEAR NOT NULL,
    season VARCHAR(50) NOT NULL
);

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE programme (
    id INT PRIMARY KEY AUTO_INCREMENT,
    department_id INT NOT NULL,
    degree VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE instructor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    designation VARCHAR(50) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE student (
    roll INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    programme_id INT NOT NULL,
    year_of_joining YEAR NOT NULL,
    FOREIGN KEY (programme_id) REFERENCES programme(id) ON DELETE CASCADE
);

CREATE TABLE course (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    code VARCHAR(5) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE takes (
    student_roll INT NOT NULL,
    course_id INT NOT NULL,
    session_id INT NOT NULL,
    grade INT NOT NULL,
    semester_number INT NOT NULL,
    taught_by INT NOT NULL,
    FOREIGN KEY (student_roll) REFERENCES student(roll) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES session(id) ON DELETE CASCADE,
    FOREIGN KEY (taught_by) REFERENCES instructor(id) ON DELETE CASCADE,
    PRIMARY KEY (student_roll, course_id, session_id)
);

CREATE TABLE teaches (
    instructor_id INT NOT NULL,
    course_id INT NOT NULL,
    session_id INT NOT NULL,
    FOREIGN KEY (instructor_id) REFERENCES instructor(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES session(id) ON DELETE CASCADE,
    PRIMARY KEY (instructor_id, course_id, session_id)
);

CREATE TABLE user (
	username VARCHAR(25) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash CHAR(60) NOT NULL
);

CREATE TABLE student_user (
    email VARCHAR(255) PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    password_hash CHAR(60) NOT NULL,
    student_roll INT NOT NULL
);

CREATE TABLE administrator (
	username VARCHAR(25) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash CHAR(60) NOT NULL,
    security_question VARCHAR(250) NOT NULL,
    security_answer_hash CHAR(60) NOT NULL
);
