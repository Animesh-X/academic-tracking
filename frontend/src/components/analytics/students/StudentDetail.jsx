import { useEffect, useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import SideBar from "../../SideBar";
import ErrorMessage from "../../ErrorMessage";
import BarChart from "../../BarChart";
import services from "../../../services/admin";
import { Box, Typography } from "@mui/material";
import CollapsibleTable from "../../CollapsibleTable";

export default function StudentDetail() {
    const { roll } = useParams();
    const [student, setStudent] = useState({});
    const [semesters, setSemesters] = useState([]);
    const [courses, setCourses] = useState([]);
    const [cpi, setCPI] = useState({});
    const [spi, setSPI] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const { user } = useLoaderData();

    useEffect(() => {
        services.setToken(user?.token);
        services
            .getStudent(roll)
            .then((student) => {
                console.log(student);
                setStudent(student);
            })
            .catch((error) => {
                setErrorMessage("Error fetching student");
                console.error(error);
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
            });
        services
            .getSemester(roll)
            .then((semesters) => {
                console.log(semesters);
                const spiPromises = semesters.map((semester) =>
                    services
                        .getSPI(roll, semester.semester_number)
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
        services
            .getCPI(roll)
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
        services
            .getCourseOfStudent(roll)
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
            


    }, [roll, user?.token]);

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

    const groupedCourseData = courses.reduce((acc, course) => {
        const { semester_number } = course;
        if (!acc[semester_number]) {
            acc[semester_number] = [];
        }
        acc[semester_number].push(course);
        return acc;
    }, {});

    console.log(groupedCourseData);

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

  console.log(rows);

    return (
        <SideBar>
            <ErrorMessage errorMessage={errorMessage} />
            <Box sx={{ mt: 4, ml: 4 }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    {student?.name} - {student?.roll}
                </Typography>
                <Typography variant="subtitle2">
                    Year of joining: {student?.year_of_joining}
                </Typography>
                <Typography variant="subtitle2">Email: {student?.email}</Typography>
                <Typography variant="h6" sx={{mt: 4, mb: 2}}>CPI: {cpi.cpi}</Typography>
            </Box>
            <Box 
            sx={{ 
                // display: 'flex', 
                // justifyContent: 'center', 
                // alignItems: 'center', 
                ml: 4
              }}
              >
            </Box>
            <Box sx={{ ml: 4 }}>
            <CollapsibleTable headers = {["Semester", "SPI"]} rows = {rows} secHeaders = {["Course", "Session", "Instructor", "Grade"]} title={`Courses taken`}/>
            </Box>
            <Box>
                <BarChart data={data} />
            </Box>
        </SideBar>
    );
}
