import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
    Typography,
    TextField,
    Button,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import SideBar from "../SideBar";
import { Box } from "@mui/system";
import adminServices from "../../services/admin";

const securityQuestions = [
    "What was the name of your first pet?",
    "What was the name of your first school?",
    "What is your favorite book?",
    "In which city were you born?",
];

const AddAdminPage = () => {
    const [securityQuestion, setSecurityQuestion] = useState("");
    const { admin } = useLoaderData();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSecurityQuestionChange = (event) => {
        setSecurityQuestion(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");
        const email = formData.get("email");
        const security_answer = formData.get("security_answer");
        if (
            !username ||
            !password ||
            !email ||
            !securityQuestion ||
            !security_answer
        ) {
            setErrorMessage(
                "Missing username or password or email or security question or security answer"
            );
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
            return;
        }
        const credentials = {
            username,
            email,
            password,
            security_question: securityQuestion,
            security_answer,
        };

        adminServices.setToken(admin?.token);
        adminServices
            .createAdmin(credentials)
            .then(() => {
                setSuccessMessage("Admin Created Successfully!!!");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
                event.target.reset();
                setSecurityQuestion("");
            })
            .catch((error) => {
                if (error.message) {
                    setErrorMessage(error.message);
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 5000);
                } else {
                    setErrorMessage(
                        "Error Adding Admin! Please check console for more details"
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
                            height: "85vh",
                        }}
                    >
                        <Paper style={{ padding: 24, borderRadius: 8 }}>
                            <Typography
                                variant="h5"
                                align="center"
                                gutterBottom
                            >
                                Create Admin
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <div style={{ width: "100%" }}>
                                    <TextField
                                        label="Username"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        id="username"
                                        name="username"
                                    />
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type="email"
                                        id="email"
                                        name="email"
                                    />
                                    <TextField
                                        label="Password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type="password"
                                        id="password"
                                        name="password"
                                    />
                                    <FormControl
                                        style={{ marginTop: 16, minWidth: 120 }}
                                        fullWidth
                                    >
                                        <InputLabel id="security-question-label">
                                            Security Question
                                        </InputLabel>
                                        <Select
                                            labelId="security-question-label"
                                            value={securityQuestion}
                                            onChange={
                                                handleSecurityQuestionChange
                                            }
                                            label="Security Question"
                                        >
                                            {securityQuestions.map(
                                                (question) => (
                                                    <MenuItem
                                                        key={question}
                                                        value={question}
                                                    >
                                                        {question}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        label="Security Answer"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        id="security_answer"
                                        name="security_answer"
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: 24 }}
                                        fullWidth
                                        type="submit"
                                    >
                                        Create
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

export default AddAdminPage;
