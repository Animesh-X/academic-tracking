import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import services from "../services/admin";

export default function DepartmentDetails () {
    const { id } = useParams();
    const [department, setDepartment] = useState({});
    const [courses, setCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

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
    }, [])
}