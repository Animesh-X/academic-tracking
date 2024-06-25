import { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import Grid from "@mui/material/Grid";
import SideBar from "../../SideBar";
import ErrorMessage from "../../ErrorMessage";
import CardAnalytics from "../../CardAnalytics";
import services from "../../../services/admin";
import Department from "../../../assets/department_image.png"
import "../../../styles/DepartmentPage.css"

export default function DepartmentPage() {
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const { user } = useLoaderData();
    console.log(`ewfwejf ${user.type}`);

    useEffect(() => {
        services.setToken(user.token);
        services
            .getAllDepartments()
            .then((data) => setDepartments(data))
            .catch((error) => setErrorMessage(error));
    }, [user?.token]);

    const handleClick = (id) => {
        console.log(id);
        navigate(`/analytics/department/${id}`)
    }
    return (
        <SideBar>
            <ErrorMessage errorMessage={errorMessage} />
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                className="grid-container"
            >
                {departments.map((department) => (
                    <Grid item xs={2} sm={4} md={4} key={department.id} onClick={()=> handleClick(department.id)}>
                        <CardAnalytics
                            title={department.name}
                            image_src={Department}
                        />
                    </Grid>
                ))}
            </Grid>
        </SideBar>
    );
}
