import { useEffect, useState } from "react";
import { useNavigate, useParams, useLoaderData } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import SideBar from "../../SideBar";
import ErrorMessage from "../../ErrorMessage";
import InteractiveList from '../../InteractiveList';
import services from "../../../services/admin";
import AutoCompleteInput from "../../AutoCompleteInput";


export default function StudentProgramme () {

    const { id } = useParams();
    const navigate = useNavigate();
    const [programme, setProgramme] = useState();
    const [studentsList, setStudentsList] = useState([]);
    const [formattedStudentList, setFormattedStudentList] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const { user } = useLoaderData();

    useEffect(() => {
        services.setToken(user?.token);
        services.getProgrammeForId(id)
        .then((data) => {
            console.log(data);
            setProgramme(data[0]);
        })
        .catch((error) => {
            setErrorMessage("Error fetching programmes details. Plese check console for more details.");
            console.error(error);
            setTimeout(() => {
            setErrorMessage("");
            }, 5000);
        });
        services.getStudentsForProgramme(id)
        .then((data) => {
            console.log(data);
            setStudentsList(data);
            const formattedData = data.map((student) => ({
                primaryText: `${student.name} - ${student.roll}`,
                secondaryText: `${student.year_of_joining}`,
                id: student.roll,
            }));
            setFormattedStudentList(formattedData);
            const searchData = data.map((student) => ({title: student.roll.toString()}));
            console.log(searchData);
            setSearchData(searchData);
        })
        .catch((error) => {
            setErrorMessage("Error fetching Students List. Plese check console for more details.");
            console.error(error);
            setTimeout(() => {
            setErrorMessage("");
            }, 5000);
        });
    }, [user?.token]);

    const handleClick = (roll) => {
        console.log(roll);
        const student = 
        navigate(`/analytics/student/${roll}`);
    }

    const handleDeleteClick = (roll, event) => {
        event.stopPropagation();
        console.log(roll);
        services
        .deleteStudent(Number(roll))
        .then(() => {
            alert("Student deleted successfully!");
            setFormattedStudentList((prevStudentList) => prevStudentList.filter((student) => student.id !== roll));
        })
        .catch((error) => {
            setErrorMessage("Error deleting student. Plese check console for more details.");
            console.error(error);
            setTimeout(() => {
            setErrorMessage("");
            }, 5000);
        });
    }

    return (
        <SideBar>
            <ErrorMessage errorMessage={errorMessage} />
            <Box sx={{ml: 3, mt: 3}}>
                <Typography variant="h4" sx={{mb: 4}}>{`Students enrolled in ${programme?.degree} ${programme?.name}`}</Typography>
                <AutoCompleteInput data={searchData} label="Enter roll no to search" handleClick={handleClick}/>
                <InteractiveList data={formattedStudentList} showSecondary={true} handleClick={handleClick} showDeleteOption = {true} handleDeleteClick = {handleDeleteClick}/>
            </Box>
        </SideBar>
    )
}