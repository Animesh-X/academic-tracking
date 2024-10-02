import { useEffect, useState } from "react";
import {
    Typography,
    Button,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import SideBar from "../SideBar";
import { Box } from "@mui/system";
import adminServices from "../../services/admin";

const AddTeachesPage = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [courses, setCourses] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [selectedInstructor, setSelectedInstructor] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedSession, setSelectedSession] = useState("");
    const { admin } = useLoaderData();

    useEffect(() => {
        adminServices.setToken(admin?.token);
        adminServices
            .getAllCourses()
            .then((data) => {
                setCourses(data);
                console.log(data);
            })
            .catch((error) => console.error("Error fetching Courses:", error));
        adminServices
            .getAllInstructors()
            .then((data) => {
                setInstructors(data);
                console.log(data);
            })
            .catch((error) =>
                console.error("Error fetching Instructors:", error)
            );
        adminServices
            .getAllSessions()
            .then((data) => {
                setSessions(data);
                console.log(data);
            })
            .catch((error) => console.error("Error fetching Sessions:", error));
    }, [admin?.token]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedCourse || !selectedInstructor || !selectedSession) {
            setErrorMessage("Missing required fields");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
            return;
        }

        const sessionDetails = selectedSession.split(" ");

        const instructorId = instructors.find(
            (instructor) => instructor.name === selectedInstructor
        )?.id;

        const courseId = courses.find(
            (course) => course.code === selectedCourse
        )?.id;

        const sessionId = sessions.find(
            (session) =>
                session.season == sessionDetails[0].toLowerCase() &&
                session.start_year == sessionDetails[1]
        )?.id;

        const credentials = {
            course_id: courseId,
            session_id: sessionId,
        };

        adminServices.setToken(admin?.token);
        adminServices
            .addTeaches(instructorId, credentials)
            .then(() => {
                setSuccessMessage("Data Added Successfully!!!");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
                event.target.reset();
                setSelectedCourse("");
                setSelectedInstructor("");
                setSelectedSession("");
            })
            .catch((error) => {
                if (error.message) {
                    setErrorMessage(error.message);
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 5000);
                } else {
                    setErrorMessage(
                        "Error adding data : Please check the console for more details"
                    );
                    console.error(error);
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 5000);
                }
            });
    };

    return (
        <SideBar>
            <ErrorMessage errorMessage={errorMessage} />
            <SuccessMessage message={successMessage} />
            <Box display="flex">
                <Box flexGrow={1}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "85vh",
                        }}
                    >
                        <Paper style={{ padding: 24, borderRadius: 8 }}>
                            <Typography
                                variant="h5"
                                align="center"
                                gutterBottom
                            >
                                Add Data
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <div style={{ width: "100%" }}>
                                    <FormControl
                                        style={{ marginTop: 16, minWidth: 120 }}
                                        fullWidth
                                    >
                                        <InputLabel id="instructor">
                                            Instructors
                                        </InputLabel>
                                        <Select
                                            labelId="instructor"
                                            value={selectedInstructor}
                                            onChange={(event) =>
                                                setSelectedInstructor(
                                                    event.target.value
                                                )
                                            }
                                            label="Instructors"
                                        >
                                            {instructors.map((instructor) => (
                                                <MenuItem
                                                    key={instructor.id}
                                                    value={instructor.name}
                                                >
                                                    {instructor.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl
                                        style={{ marginTop: 16, minWidth: 120 }}
                                        fullWidth
                                    >
                                        <InputLabel id="course">
                                            Courses
                                        </InputLabel>
                                        <Select
                                            labelId="course"
                                            value={selectedCourse}
                                            onChange={(event) =>
                                                setSelectedCourse(
                                                    event.target.value
                                                )
                                            }
                                            label="Courses"
                                        >
                                            {courses.map((course) => (
                                                <MenuItem
                                                    key={course.id}
                                                    value={course.code}
                                                >
                                                    {`${course.code} ${course.title}`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl
                                        style={{ marginTop: 16, minWidth: 120 }}
                                        fullWidth
                                    >
                                        <InputLabel id="session">
                                            Session
                                        </InputLabel>
                                        <Select
                                            labelId="session"
                                            value={selectedSession}
                                            onChange={(event) =>
                                                setSelectedSession(
                                                    event.target.value
                                                )
                                            }
                                            label="Session"
                                        >
                                            {sessions.map((session) => (
                                                <MenuItem
                                                    key={session.id}
                                                    value={`${session.season.toUpperCase()} ${session.start_year
                                                        }`}
                                                >
                                                    {`${session.season.toUpperCase()} ${session.start_year
                                                        }`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: 24 }}
                                        fullWidth
                                        type="submit"
                                    >
                                        Add Data
                                    </Button>
                                </div>
                            </form>
                        </Paper>
                    </div>
                </Box>
            </Box>
        </SideBar>
    );
};

export default AddTeachesPage;
