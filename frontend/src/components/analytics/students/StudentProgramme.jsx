import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../../SideBar";
import ErrorMessage from "../../ErrorMessage";
import InteractiveList from '../../InteractiveList';
import services from "../../../services/admin";
import { Box, Typography } from "@mui/material";
import AutoCompleteInput from "../../AutoCompleteInput";


export default function StudentProgramme () {

    const { id } = useParams();
    const [programme, setProgramme] = useState();
    const [studentsList, setStudentsList] = useState([]);
    const [formattedStudentList, setFormattedStudentList] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const user = JSON.parse(
        localStorage.getItem("loggedAcademicTrackingAdmin") ||
        localStorage.getItem("loggedAcademicTrackingUser")
    );

    useEffect(() => {
        services.setToken(user?.token);
        services.getProgrammeForId(id)
        .then((data) => {
            console.log(data);
            setProgramme(data[0]);
        })
        .catch((error) => {
            setErrorMessage("Error fetching inctructor details");
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
            setErrorMessage("Error fetching Students List");
            console.error(error);
            setTimeout(() => {
            setErrorMessage("");
            }, 5000);
        });
    }, []);

    const handleClick = (roll) => {
        console.log(roll);
    }

    return (
        <SideBar>
            <ErrorMessage errorMessage={errorMessage} />
            <Box sx={{ml: 3, mt: 3}}>
                <Typography variant="h4" sx={{mb: 4}}>{`Students enrolled in ${programme?.degree} ${programme?.name}`}</Typography>
                <AutoCompleteInput data={searchData} label="Enter roll no to search" handleClick={handleClick}/>
                <InteractiveList data={formattedStudentList} showSecondary={true} handleClick={handleClick}/>
            </Box>
        </SideBar>
    )
}