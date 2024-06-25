import { useEffect, useState } from 'react'
import { useParams, useLoaderData, useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material';
import SideBar from "../../SideBar";
import ErrorMessage from "../../ErrorMessage";
import services from "../../../services/admin";
import '../../../styles/InstructorDetails.css';
import InteractiveList from '../../InteractiveList';

export default function InstructorDetails() {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [instructor, setInstructor] = useState([]);
  const [details, setDetails] = useState([]);
  const { user } = useLoaderData();
  const navigate = useNavigate();


  useEffect(() => {
    services.setToken(user.token);
    services
      .getInstructor(id)
      .then((data) => {
        setInstructor(data);
        console.log(data);
      })
      .catch((error) => {
        setErrorMessage("Error fetching Instructor. Please check console for more details.");
        console.error(error);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });
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
      .catch((error) => {
        setErrorMessage("Error fetching Courses. Please check console for more details.");
        console.error(error);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });
  }, [user?.token]);

  const handleClick = (courseId, sessionId) => {
    console.log(`Course Id ${courseId} Session Id ${sessionId}`);
    navigate(`/analytics/instructor/${id}/course/${courseId}/session/${sessionId}`);
  }

  const content = details.length === 0 ? (
    <SideBar>
      <ErrorMessage errorMessage={errorMessage} />
      <Typography variant="h4" component="h4" sx={{ mt: 5, mb: 3, ml: 3 }}>
                No Course taught by Dr. {instructor.name}
      </Typography>
    </SideBar>
  ) : (
    <SideBar>
      <ErrorMessage errorMessage={errorMessage} />
      <Typography variant="h4" component="h4" className='typography-detail'>
        Courses offered by Dr. {instructor.name}
      </Typography>
      <InteractiveList data={details} showSecondary={true} handleClick={handleClick}/>
    </SideBar>
  )

  return content;
}
