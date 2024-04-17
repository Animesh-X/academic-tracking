import { useEffect, useState } from 'react'
import CardAnalytics from './CardAnalytics'
import userServices from '../services/user'
import Grid from "@mui/material/Grid";
import Department from '../assets/department_image.png'
import Instructor from '../assets/instructor_image.png'
import Student from '../assets/student_image.jpeg'
import Book from '../assets/book_icon.png'
import Session from '../assets/session_image.png'
import Programme from '../assets/programme_image.png'
import { useNavigate } from 'react-router-dom'
import '../styles/Analytics.css'
import CustomThemeProvider from './CustomThemeProvider'
import ResponsiveAppBar from './ResponsiveAppBar'

export default function Analytics() {
    const navigate = useNavigate();
    const [departmentCount, setDepartmentCount] = useState(0);
    const [instructorCount, setInstructorCount] = useState(0);
    const [studentCount, setStudentCount] = useState(0);
    const [courseCount, setCourseCount] = useState(0);
    const [programmeCount, setProgrammeCount] = useState(0);
    const [sessionCount, setSessionCount] = useState(0);
    const user = JSON.parse(localStorage.getItem("loggedAcademicTrackingAdmin") || localStorage.getItem("loggedAcademicTrackingUser"));

    useEffect(() => {
        userServices.setToken(user?.token);
        userServices.getDepartmentCount()
            .then((count) => {
                setDepartmentCount(count);
            })
            .catch(error => console.error("Error fetching programmes:", error));
        userServices.getInstructorCount()
            .then((instructorCount) => {
                setInstructorCount(instructorCount);
            })
            .catch(error => console.error('Error getting instructors count', error));
        userServices.getStudentCount()
            .then((studentCount) => {
                setStudentCount(studentCount);
            })
            .catch(error => console.error('Error getting students count', error));
        userServices.getCourseCount()
            .then((courseCount) => {
                setCourseCount(courseCount);
            })
            .catch(error => console.error('Error getting students count', error));
        userServices.getProgrammesCount()
            .then((programmeCount) => {
                setProgrammeCount(programmeCount);
            })
            .catch(error => console.error('Error getting students count', error));
        userServices.getSessionCount()
            .then((sessionCount) => {
                setSessionCount(sessionCount);
            })
            .catch((error) => {
                console.error('Error fetching Session Count', error);
            })
    }, [user])

    return (
        <CustomThemeProvider>
            <ResponsiveAppBar />
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                className="grid-container container"
            >
                <Grid item xs={2} sm={4} md={4}>
                    <CardAnalytics title={departmentCount} subTitle={"Department"} image_src={Department} />
                </Grid>
                <Grid item xs={2} sm={4} md={4} onClick={() => navigate("/analytics/instructors")}>
                    <CardAnalytics title={instructorCount} subTitle={"Faculty"} image_src={Instructor} />
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    <CardAnalytics title={studentCount} subTitle={"Student"} image_src={Student} />
                </Grid>
                <Grid item xs={2} sm={4} md={4} onClick={() => navigate("/analytics/courses")}>
                    <CardAnalytics title={courseCount} subTitle={"Courses Offered"} image_src={Book} />
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    <CardAnalytics title={programmeCount} subTitle={"Programmes Offered"} image_src={Programme} />
                </Grid>
                <Grid item xs={2} sm={4} md={4} onClick={() => navigate("/analytics/sessions")}>
                    <CardAnalytics title={sessionCount} subTitle={"Session Offered"} image_src={Session} />
                </Grid>

            </Grid>
        </CustomThemeProvider>
    )
}