import { useState } from "react";
import { Typography, TextField, Button, Paper } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import SideBar from "../SideBar";
import { Box } from "@mui/system";
import adminServices from "../../services/admin";

const AddDepartment = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { admin } = useLoaderData();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const department_name = formData.get("department_name");
        console.log(department_name);
        if (!department_name) {
            setErrorMessage("Missing department name");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
            return;
        }
        const credentials = {
            name: department_name,
        };

        adminServices.setToken(admin?.token);
        adminServices
            .addDepartment(credentials)
            .then(() => {
                setSuccessMessage("Department Added Successfully!!!");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
                event.target.reset();
            })
            .catch((error) => {
                if (error.message) {
                    setErrorMessage(error.message);
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 5000);
                } else {
                    setErrorMessage(
                        "Error logging in : Please check the console for more details"
                    );
                    console.error(error);
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 5000);
                }
            });
    };

    return (
        <SideBar>
            <ErrorMessage errorMessage={errorMessage} />
            <SuccessMessage message={successMessage} />
            <Box display="flex">
                <Box flexGrow={1}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "85vh"
                        }}
                    >
                        <Paper style={{ padding: 24, borderRadius: 8 }}>
                            <Typography
                                variant="h5"
                                align="center"
                                gutterBottom
                            >
                                Add Department
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <div style={{ width: "100%" }}>
                                    <TextField
                                        label="Department Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        id="department_name"
                                        name="department_name"
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: 24 }}
                                        fullWidth
                                        type="submit"
                                    >
                                        Add Department
                                    </Button>
                                </div>
                            </form>
                        </Paper>
                    </div>
                </Box>
            </Box>
        </SideBar>
    );
};

export default AddDepartment;
