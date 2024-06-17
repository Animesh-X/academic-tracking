import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SideBar from "../../SideBar";
import ErrorMessage from "../../ErrorMessage";
import InteractiveList from '../../InteractiveList';
import services from "../../../services/admin";
import '../../../styles/InstructorPage.css'


export default function InstructorPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [instructorData, setInstructorData] = useState([]);
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
      <InteractiveList data={instructorData} showSecondary={true} header="Professors" handleClick={handleClick} handleDeleteClick={handleDeleteClick} showDeleteOption = {true}/>
    </SideBar>
  );
}
