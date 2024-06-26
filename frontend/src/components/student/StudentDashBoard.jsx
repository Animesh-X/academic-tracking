import { useLoaderData } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import studentService from "../../services/student";
import SideBar from "../SideBar";
import ErrorMessage from "../ErrorMessage";
import BarChart from "../BarChart";
import CollapsibleTable from "../CollapsibleTable";

export default function StudentDashBoard () {
    const { student } = useLoaderData();
    const [studentDetail, setStudentDetail] = useState({});
    const [semesters, setSemesters] = useState([]);
    const [courses, setCourses] = useState([]);
    const [cpi, setCPI] = useState({});
    const [spi, setSPI] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        studentService.setToken(student?.token);
        studentService
            .getStudentDetail()
            .then((student) => {
                console.log(student);
                setStudentDetail(student);
            })
            .catch((error) => {
                setErrorMessage("Error fetching student");
                console.error(error);
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
            });
            studentService
            .getSemesters()
            .then((semesters) => {
                console.log(semesters);
                const spiPromises = semesters.map((semester) =>
                    studentService
                        .getSPI(semester.semester_number)
                        .then((semester_spi) => ({
                            semester_number: semester.semester_number,
                            spi: semester_spi,
                        }))
                );

                Promise.all(spiPromises)
                    .then((spiData) => {
                        console.log(spiData);
                        setSPI(spiData);
                    })
                    .catch((error) => {
                        setErrorMessage("Error fetching SPI data");
                        console.error(error);
                        setTimeout(() => {
                            setErrorMessage("");
                        }, 5000);
                    });
                setSemesters(semesters);
            })
            .catch((error) => {
                setErrorMessage("Error fetching semesters. Plese check console for more details.");
                console.error(error);
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
            });
        studentService
            .getCPI()
            .then((cpi) => {
                console.log(cpi);
                setCPI(cpi);
            })
            .catch((error) => {
                setErrorMessage("Error fetching CPI. Plese check console for more details.");
                console.error(error);
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
            });
        studentService
            .getCourses()
            .then((data) => {
                console.log(data);
                setCourses(data);
            })
            .catch((error) => {
                setErrorMessage("Error fetching Course. Plese check console for more details.");
                console.error(error);
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
            });
    },[student?.token]);

    const data = {
        labels: spi.map((semesterSpi) => semesterSpi.semester_number),
        datasets: [
            {
                label: "SPI of Each Semester",
                data: spi.map((semesterSpi) => semesterSpi.spi.spi),
                // backgroundColor: 'rgba(255, 99, 132, 0.5)',
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    function createDropdownData(courses) {
        return courses.map(course => ({
        code: course.code,
        title: course.title,
        season: course.season,
        start_year: course.start_year,
        instructor_name: course.instructor_name,
        grade: course.grade
        }));
    }
    const rows = spi?.map((semesterSpi) => {
        const filteredCourses = courses.filter(course => course.semester_number === semesterSpi.semester_number);
        const dropdownData = createDropdownData(filteredCourses);
        return {
        semester_number: semesterSpi.semester_number,
        spi: semesterSpi.spi,
        dropdown: dropdownData,
        };
    });

    return (
        <Box>
            <SideBar>
                <ErrorMessage errorMessage={errorMessage} />
                <Box>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                        {studentDetail?.name} - {studentDetail?.roll}
                    </Typography>
                    <Typography variant="subtitle2">
                        Year of joining: {studentDetail?.year_of_joining}
                    </Typography>
                    <Typography variant="subtitle2">Email: {student?.email}</Typography>
                    <Typography variant="h6" sx={{mt: 4, mb: 2}}>CPI: {cpi.cpi}</Typography>
                    <CollapsibleTable headers = {["Semester", "SPI"]} rows = {rows} secHeaders = {["Course", "Session", "Instructor", "Grade"]} title={`Courses taken`}/>
                </Box>
                    <BarChart data={data} />
            </SideBar>
        </Box>
    )
}