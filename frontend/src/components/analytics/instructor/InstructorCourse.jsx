import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import SideBar from "../../SideBar";
import BarChart from "../../BarChart";
import InteractiveList from "../../InteractiveList";
import ErrorMessage from "../../ErrorMessage";
import services from "../../../services/admin";
import { useNavigate, useParams } from "react-router-dom";

export default function InstructorCourse () {
    const { id, courseId, sessionId } = useParams();

    const [currInstructor, setCurrInstructor] = useState([]);
    const [instructorsList, setInstructorsList] = useState([]);
    const [studentsList, setStudentsList] = useState([]);
    const [totalAvgGrade, setTotalAvgGrade] = useState([]);
    const [avgGrade, setAvgGrade] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("loggedAcademicTrackingAdmin") ||
        localStorage.getItem("loggedAcademicTrackingUser")
    );

    const labels = ["Total Students", "Average Grade"];

    const data = {
        labels,
        datasets: [
          {
            label: `Under Dr. ${currInstructor?.name}`,
            data: [avgGrade[0]?.student_count, avgGrade[0]?.avg_grade],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Overall',
            data: [totalAvgGrade[0]?.student_count, totalAvgGrade[0]?.avg_grade],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

      const handleClick = (instructorId) => {
        navigate(`/analytics/instructor/${instructorId}`)
      }

    useEffect(() => {
        services.setToken(user?.token);
        services
        .getInstructor(id)
        .then((data) => {
            setCurrInstructor(data);
            console.log(data);
        })
        .catch((error) => {
            setErrorMessage("Error fetching instructors");
            console.error(error);
            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
          });
          services
          .getInstructorOfCourse(courseId, sessionId)
          .then((data) => {
              const formattedData = data.instructors.map((instructor) => ({
                primaryText: `Dr. ${instructor.instructor_name}`,
                secondaryText: instructor.instructor_designation,
                id: instructor.instructor_id,
            }));
            console.log(formattedData[0].id);
            const filteredData = formattedData.filter((instructor) => instructor.id !== currInstructor.id);
            setInstructorsList(filteredData);
          })
          .catch((error) => {
              setErrorMessage("Error fetching instructors");
              console.error(error);
              setTimeout(() => {
                setErrorMessage("");
              }, 5000);
            });
        services
        .getAvgGradeForCourseForSession(courseId, sessionId)
        .then((data) => {
            setTotalAvgGrade(data);
            console.log(data);
        })
        .catch((error) => {
            setErrorMessage("Error fetching instructors");
            console.error(error);
            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
          });
          services
          .getAvgGradeForCourseForSessionForInstructor(courseId, sessionId, id)
          .then((data) => {
              setAvgGrade(data);
              console.log(data);
          })
          .catch((error) => {
              setErrorMessage("Error fetching instructors");
              console.error(error);
              setTimeout(() => {
                setErrorMessage("");
              }, 5000);
            });
    }, [])

    const content = avgGrade.length === 0 || avgGrade[0]?.student_count === 0 ? (
        <SideBar>
            <Typography variant="h4" component="h4" sx={{ mt: 5, mb: 3, ml: 3 }}>
                No student enrolled in this course
            </Typography>
        </SideBar>
    ) : (
        <SideBar>
            <ErrorMessage errorMessage={errorMessage}/>
            <Box sx={{ ml: 3, mb: 2 }}>
                <Typography variant="h4" component="h4" sx={{ mt: 5, mb: 3 }}>
                    Details of {`${avgGrade[0]?.code} ${avgGrade[0]?.title}`} taught by Dr. {currInstructor.name}
                </Typography>
                <Typography variant="h6">
                    Total Student enrolled in {`${avgGrade[0]?.code} ${avgGrade[0]?.title}`} under Dr. {currInstructor.name}: {avgGrade[0]?.student_count}
                </Typography>
                <Typography variant="h6">
                    Average Grade: {avgGrade[0]?.avg_grade}
                </Typography>
                <Typography variant="h6">
                    Overall Total Student enrolled in {`${avgGrade[0]?.code} ${avgGrade[0]?.title}`}: {totalAvgGrade[0]?.student_count}
                </Typography>
                <Typography variant="h6">
                    Overall Average Grade: {totalAvgGrade[0]?.avg_grade}
                </Typography>
            </Box>
            <BarChart data={data} />
            <InteractiveList data={instructorsList} showSecondary={true} handleClick={handleClick} header="Instructors taking this course" />
        </SideBar>
    );
    return content;
}