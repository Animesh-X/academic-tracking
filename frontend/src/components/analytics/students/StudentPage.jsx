import React, { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import Button from '@mui/material/Button';
import { Box, Typography } from "@mui/material";
import SideBar from "../../SideBar";
import BarChart from "../../BarChart";
import ErrorMessage from "../../ErrorMessage";
import services from "../../../services/admin";

export default function StudentPage () {
    const [studentCount, setStudentCount] = useState(0);
    const [studentDetails, setStudentDetails] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [pieLabels, setPieLabels] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const { user } = useLoaderData();

    useEffect(() => {
        services.setToken(user?.token);
        services.getStudentCount()
        .then((studentCount) => {
            setStudentCount(studentCount);
        })
        .catch((error) => {
            setErrorMessage("Error fetching count of student. Plese check console for more details.");
            console.error(error);
            setTimeout(() => {
            setErrorMessage("");
            }, 5000);
        });
        services
        .getStudentCountForProgrammes()
        .then((data) => {
            console.log(data);
            setStudentDetails(data);
            const pLabel = data.map((detail) => `${detail.degree} ${detail.name}`);
            const pData = data.map((detail) => detail.count);
            setPieLabels(pLabel);
            setPieData(pData);
        })
        .catch((error) => {
            setErrorMessage("Error fetching details of students. Plese check console for more details.");
            console.error(error);
            setTimeout(() => {
            setErrorMessage("");
            }, 5000);
        });
    }, [user?.token]);

    const data = {
        labels: pieLabels,
        datasets: [
          {
            label: '# of Students',
            data: pieData,
            // backgroundColor: 'rgba(255, 99, 132, 0.5)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          }
        ]
      }

      const handleClick = (id) => {

        navigate(`/analytics/students/programme/${id}`);
      }

    return (
        <SideBar>
            <ErrorMessage errorMessage={errorMessage} />
            {studentDetails.map((student) => (
                <Box sx={{ ml: 3, mt: 2 }} key={student.programme_id}>
                    <Button onClick={() => handleClick(student.programme_id)}>
                        <Typography variant="h6">{`Total Students enrolled in ${student.degree} ${student.name}: ${student.count}`}</Typography>
                    </Button>
                </Box>
            ))}
            <BarChart data={data}/>
        </SideBar>
    )
}