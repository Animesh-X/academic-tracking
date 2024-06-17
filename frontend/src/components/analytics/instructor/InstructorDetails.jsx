import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SideBar from "../../SideBar";
import ErrorMessage from "../../ErrorMessage";
import CardAnalytics from "../../CardAnalytics";
import services from "../../../services/admin";
import '../../../styles/InstructorDetails.css';
import Book from '../../../assets/book_image.png';
import InteractiveList from '../../InteractiveList';

export default function InstructorDetails() {
  const { id } = useParams();
  const [instructor, setInstructor] = useState([]);
  const [details, setDetails] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedAcademicTrackingAdmin") || localStorage.getItem("loggedAcademicTrackingUser"));
  const navigate = useNavigate();


  useEffect(() => {
    services.setToken(user.token);
    services
      .getInstructor(id)
      .then((data) => {
        setInstructor(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching Instructor:", error));
    services
      .getCourseInstructor(id)
      .then((data) => {
        const formattedData = data.map((courseData) => ({
          primaryText: courseData.course_code + " " + courseData.course_title,
          secondaryText: `${courseData.season.toUpperCase()} ${courseData.start_year}`,
          id: courseData.course_id,
          secId: courseData.session_id,
      }));
        setDetails(formattedData);
        console.log(formattedData);
      })
      .catch((error) => console.error("Error fetching Courses:", error));
  }, []);

  const handleClick = (courseId, sessionId) => {
    console.log(`Course Id ${courseId} Session Id ${sessionId}`);
    navigate(`/analytics/instructor/${id}/course/${courseId}/session/${sessionId}`);
  }

  return (
    <SideBar>
      <Typography variant="h4" component="h4" className='typography-detail'>
        Courses offered by Dr. {instructor.name}
      </Typography>
      <InteractiveList data={details} showSecondary={true} handleClick={handleClick}/>
    </SideBar>
  );
}
