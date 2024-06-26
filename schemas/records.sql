-- session
INSERT INTO session (start_year, season) VALUES
('2022', 'Monsoon'),
('2022', 'Winter'),
('2023', 'Monsoon'),
('2023', 'Winter'),
('2024', 'Monsoon'),
('2024', 'Winter'),
('2025', 'Monsoon'),
('2025', 'Winter'),
('2026', 'Monsoon'),
('2026', 'Winter');

-- department
INSERT INTO department (name) VALUES
('CSE'),
('ECE'),
('ME'),
('CE'),
('EE'),
('CHE'),
('MATH'),
('PHYSICS'),
('HSS'),
('BIO');

-- programme
INSERT INTO programme (department_id, degree, name) VALUES
(1, 'B.Tech.', 'Computer Science and Engineering'),
(1, 'M.Tech.', 'Computer Science and Engineering'),
(1, 'Ph.D.', 'Computer Science and Engineering'),
(2, 'B.Tech.', 'Electronics and Communication Engineering'),
(2, 'M.Tech.', 'Electronics and Communication Engineering'),
(2, 'Ph.D.', 'Electronics and Communication Engineering'),
(3, 'B.Tech.', 'Mechanical Engineering'),
(4, 'B.Tech.', 'Civil Engineering'),
(5, 'B.Tech.', 'Electrical Engineering'),
(6, 'B.Tech.', 'Chemical Engineering');

-- instructor
INSERT INTO instructor (name, designation, department_id) VALUES
('John Doe', 'Professor', 1),
('Jane Smith', 'Assistant Professor', 1),
('Alice Johnson', 'Associate Professor', 1),
('Bob Brown', 'Lecturer', 1),
('Emily Davis', 'Professor', 2),
('Michael Wilson', 'Associate Professor', 2),
('Sarah Miller', 'Assistant Professor', 2),
('David Garcia', 'Professor', 2),
('Alexandra Lee', 'Lecturer', 1),
('Christopher Thompson', 'Assistant Professor', 2);

-- student
INSERT INTO student (roll, name, email, programme_id, year_of_joining) VALUES
(2201001, 'Alex Johnson', 'alex@iiit.ac.in', 1, 2022),
(2201002, 'Emma Davis', 'emma@iiit.ac.in', 1, 2022),
(2201003, 'James Wilson', 'james@iiit.ac.in', 1, 2022),
(2201004, 'Olivia Brown', 'olivia@iiit.ac.in', 1, 2022),
(2201005, 'William Garcia', 'william@iiit.ac.in', 1, 2022),
(2202001, 'Sophia Miller', 'sophia@iiit.ac.in', 2, 2022),
(2202002, 'Daniel Martinez', 'daniel@iiit.ac.in', 2, 2022),
(2203001, 'Ava Anderson', 'ava@iiit.ac.in', 3, 2022),
(2203002, 'Alexander Taylor', 'alexander@iiit.ac.in', 3, 2022),
(2203003, 'Mia Thomas', 'mia@iiit.ac.in', 3, 2022);

-- course
INSERT INTO course (title, code, department_id) VALUES
('Data Structures', 'CS101', 1),
('Digital Electronics', 'EC101', 2),
('Algorithms', 'CS201', 1),
('Communication Systems', 'EC201', 2),
('Database Management', 'CS301', 1),
('Embedded Systems', 'EC301', 2),
('Machine Learning', 'CS401', 1),
('VLSI Design', 'EC401', 2),
('Computer Networks', 'CS501', 1),
('Signal Processing', 'EC501', 2);

-- takes
INSERT INTO takes (student_roll, course_id, session_id, grade, semester_number, taught_by) VALUES
(2201001, 1, 1, 8, 1, 1),
(2201002, 2, 1, 9, 1, 2),
(2201003, 3, 1, 9, 1, 3),
(2201004, 4, 1, 10, 1, 4),
(2201005, 5, 1, 8, 1, 1),
(2202001, 6, 1, 9, 1, 2),
(2202002, 7, 1, 9, 1, 3),
(2203001, 8, 1, 10, 1, 4),
(2203002, 9, 1, 8, 1, 1),
(2203003, 10, 1, 9, 1, 2);

-- teaches
INSERT INTO teaches (instructor_id, course_id, session_id) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 6, 1),
(7, 7, 1),
(8, 8, 1),
(1, 9, 1),
(2, 10, 1);

-- user
INSERT INTO user (username, email, password_hash) VALUES
('user1', 'user1@iiit.ac.in', 'password1'),
('user2', 'user2@iiit.ac.in', 'password2'),
('user3', 'user3@iiit.ac.in', 'password3'),
('user4', 'user4@iiit.ac.in', 'password4'),
('user5', 'user5@iiit.ac.in', 'password5'),
('user6', 'user6@iiit.ac.in', 'password6'),
('user7', 'user7@iiit.ac.in', 'password7'),
('user8', 'user8@iiit.ac.in', 'password8'),
('user9', 'user9@iiit.ac.in', 'password9'),
('user10', 'user10@iiit.ac.in', 'password10');


-- administrator
INSERT INTO administrator (username, email, password_hash, security_question, security_answer_hash) VALUES
('admin1', 'admin1@iiit.ac.in', 'admin_password1', 'What is your favorite color?', 'answer_hash1'),
('admin2', 'admin2@iiit.ac.in', 'admin_password2', 'What is your pet\'s name?', 'answer_hash2'),
('admin3', 'admin3@iiit.ac.in', 'admin_password3', 'What is your favorite food?', 'answer_hash3'),
('admin4', 'admin4@iiit.ac.in', 'admin_password4', 'What is the name of your first school?', 'answer_hash4'),
('admin5', 'admin5@iiit.ac.in', 'admin_password5', 'What city were you born in?', 'answer_hash5'),
('admin6', 'admin6@iiit.ac.in', 'admin_password6', 'What is your favorite movie?', 'answer_hash6'),
('admin7', 'admin7@iiit.ac.in', 'admin_password7', 'What is your mother\'s maiden name?', 'answer_hash7'),
('admin8', 'admin8@iiit.ac.in', 'admin_password8', 'What is your favorite book?', 'answer_hash8'),
('admin9', 'admin9@iiit.ac.in', 'admin_password9', 'What is your favorite sport?', 'answer_hash9'),
('admin10', 'admin10@iiit.ac.in', 'admin_password10', 'What is your favorite holiday destination?', 'answer_hash10');
