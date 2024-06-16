import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import ErrorMessage from "../../ErrorMessage";
import CardAnalytics from "../../CardAnalytics";
import SideBar from "../../SideBar";
import services from "../../../services/admin";
import CourseImg from '../../../assets/course_image.png';

export default function DepartmentCourse () {
    const { id } = useParams();
    const [details, setDetails] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const user = JSON.parse(
        localStorage.getItem("loggedAcademicTrackingAdmin") ||
        localStorage.getItem("loggedAcademicTrackingUser")
    );

    useEffect(() => {
        services.setToken(user?.token);
        services.getCoursesOfDepartment(id)
        .then((data) => {
            setDetails(data);
            console.log(data);
          })
          .catch((error) => {
            setErrorMessage("Error fetching department");
            console.error(error);
            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
          });
    }, []);

    return (
        <SideBar>
            <ErrorMessage errorMessage={errorMessage} />
            <Typography variant="h4" component="h4" className='typography-detail'>
                Courses offered in {details[0]?.department_name}
            </Typography>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                className="grid-container"
            >
                {details.map((detail) => (
                    <Grid item xs={2} sm={4} md={4} key={detail.course_id}>
                        <CardAnalytics
                            title = {detail.course_code}
                            subTitle = {detail.course_title}
                            image_src={CourseImg}
                        />
                    </Grid>
                ))}
            </Grid>
        </SideBar>
    )
}