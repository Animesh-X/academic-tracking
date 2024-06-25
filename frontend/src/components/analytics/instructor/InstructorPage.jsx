import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SideBar from "../../SideBar";
import ErrorMessage from "../../ErrorMessage";
import InteractiveList from '../../InteractiveList';
import AutoCompleteInput from "../../AutoCompleteInput";
import services from "../../../services/admin";
import '../../../styles/InstructorPage.css'
import { Box, Typography } from '@mui/material';


export default function InstructorPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [instructorData, setInstructorData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const navigate = useNavigate();

  // TODO Handle this
  const user = JSON.parse(
    localStorage.getItem("loggedAcademicTrackingAdmin") ||
    localStorage.getItem("loggedAcademicTrackingUser")
  );

  const handleClick = (id) => {
    console.log("CLICK",id);
    navigate(`/analytics/instructor/${id}`);
  }

  const handleDeleteClick = (id, event) => {
    event.stopPropagation();
    console.log("DELECT CLICK",id);
    services
      .deleteInstructor(id)
      .then(() => {
        alert("Instructor deleted successfully!");
        setInstructorData((prevInstructorData) => prevInstructorData.filter((instructor) => instructor.id !== id));
      })
      .catch((error) => {
        setErrorMessage("Error fetching instructors");
        console.error(error);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });
  }

  const handleSearchClick = (name) => {
    const { id } = instructorData.filter((instructor) => (instructor.primaryText === name))[0];
    navigate(`/analytics/instructor/${id}`);
  }

  useEffect(() => {
    services.setToken(user?.token);
    services
      .getAllInstructors()
      .then((data) => {
        console.log(data);
        const instructorDataFormatted = data.map((instructor) => ({
          primaryText: instructor.name,
          secondaryText: instructor.designation,
          id: instructor.id,
        }));
        setInstructorData(instructorDataFormatted);
        const searchData = data.map((instructor) => ({title: instructor.name}));
        setSearchData(searchData)
      })
      .catch((error) => {
        setErrorMessage("Error fetching instructors");
        console.error(error);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });

  }, []);

  return (
    <SideBar>
      <ErrorMessage errorMessage={errorMessage} />
      <Box sx={{ml: 4, mt: 4}}>
        <Typography variant='h4' sx={{mb: 2}}>Professors</Typography>
        <AutoCompleteInput data={searchData} label="Search" handleClick={handleSearchClick}/>
      </Box>
      <InteractiveList data={instructorData} showSecondary={true} handleClick={handleClick} handleDeleteClick={handleDeleteClick} showDeleteOption = {true}/>
    </SideBar>
  );
}
