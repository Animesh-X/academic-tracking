import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import CardAnalytics from '../../CardAnalytics';
import SideBar from '../../SideBar';
import ErrorMessage from '../../ErrorMessage';
import services from "../../../services/admin";
import InstructorImg from '../../../assets/instructor_image.png';
import CourseImg from '../../../assets/course_image.png';
import StudentImg from '../../../assets/student_image.jpeg';
import BarChart from '../../BarChart';


export default function DepartmentDetails () {
    const { id } = useParams();
    const [department, setDepartment] = useState({});
    const [coursesCount, setCoursesCount] = useState();
    const [instructorsCount, setInstructorsCount] = useState();
    const [studentsCount, setStudentsCount] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const labels = ['Total Courses', 'Total Instructors','Total Students'];

    const data = {
      labels,
      datasets: [
        {
          label: 'Count',
          data: [coursesCount, instructorsCount, studentsCount],
          // backgroundColor: 'rgba(255, 99, 132, 0.5)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
      ]
    }

    const user = JSON.parse(
        localStorage.getItem("loggedAcademicTrackingAdmin") ||
        localStorage.getItem("loggedAcademicTrackingUser")
    );

    useEffect(() => {
        services.setToken(user?.token);
        services.getDepartment(id)
        .then((data) => {
            setDepartment(data);
            console.log(data);
          })
          .catch((error) => {
            setErrorMessage("Error fetching department");
            console.error(error);
            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
          });
          services.getCourseCountOfDepartment(id)
          .then((data) => {
            setCoursesCount(data);
            console.log(data);
          })
          .catch((error) => {
            setErrorMessage("Error fetching Course Count");
            console.error(error);
            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
          });
          services.getInstructorCountOfDepartment(id)
          .then((data) => {
            setInstructorsCount(data);
            console.log(data);
          })
          .catch((error) => {
            setErrorMessage("Error fetching Course Count");
            console.error(error);
            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
          });
          services.getStudentCountOfDepartment(id)
          .then((data) => {
            setStudentsCount(data);
            console.log(data);
          })
          .catch((error) => {
            setErrorMessage("Error fetching Course Count");
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
          Details of {department.name}
        </Typography>
        <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                className="grid-container"
        >
        <Grid item xs={2} sm={4} md={4} onClick={() => navigate(`/analytics/department/courses/${id}`)}>
          <CardAnalytics title={coursesCount} subTitle="Total Courses" image_src={CourseImg}/>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <CardAnalytics title={instructorsCount} subTitle="Total Instructors" image_src={InstructorImg}/>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <CardAnalytics title={studentsCount} subTitle="Total Students" image_src={StudentImg}/>
        </Grid>
        </Grid>
        <BarChart data={data}/>
      </SideBar>
    )
}