import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { Select, InputLabel } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import adminService from "../services/admin";
import userService from "../services/user";
import ErrorMessage from "./ErrorMessage";
import { useLoaderData } from "react-router-dom";

const pages = ["Products", "Pricing", "Blog"];

const securityQuestions = [
    "What was the name of your first pet?",
    "What was the name of your first school?",
    "What is your favorite book?",
    "In which city were you born?",
];

function ResponsiveAppBar() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [openPasswordModal, setOpenPasswordModal] = React.useState(false);
    const [openUsernameModal, setOpenUsernameModal] = React.useState(false);
    const [currentPassword, setCurrentPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newUsername, setNewUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [securityQuestion, setSecurityQuestion] = React.useState("");
    const [security_answer, setSecurityAnswer] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [email, setEmail] = React.useState("");
    const { admin, user } = useLoaderData();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        window.localStorage.removeItem("loggedAcademicTrackingAdmin");
        window.localStorage.removeItem("loggedAcademicTrackingUser");
        navigate("/", { replace: true });
    };

    const handleChangePasswordOpenModal = () => {
        setOpenPasswordModal(true);
    };

    const handleChangeUsernameOpenModal = () => {
        setOpenUsernameModal(true);
    };

    const handleClick = () => {
        const user = JSON.parse(
            localStorage.getItem("loggedAcademicTrackingAdmin")
        );
        if (user && user.type === "administrator") {
            console.log("admin");
            navigate("/admin/dashboard");
        } else {
            navigate("/");
        }
    };

    const handlePasswordChange = () => {
        console.log(admin, user);
        if (!currentPassword || !newPassword) {
            setErrorMessage("Missing fields");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
            return;
        }
        if (admin) {
            const credentials = {
                new_password: newPassword,
                current_password: currentPassword,
            };
            adminService.setToken(admin?.token);
            adminService
                .changeAdminPassword(credentials)
                .then(() => {
                    alert("Successfully changed password!");
                })
                .catch((error) => {
                    if (error.response.data.error) {
                        setErrorMessage(error.response.data.error);
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
        } else {
            const credentials = {
                new_password: newPassword,
                current_password: currentPassword,
            };
            adminService.setToken(user?.token);
            adminService
                .changeUserPassword(credentials)
                .then(() => {
                    alert("Successfully changed password!");
                })
                .catch((error) => {
                    if (error.response.data.error) {
                        setErrorMessage(error.response.data.error);
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
        }
        // Reset the password fields and close the modal
        setCurrentPassword("");
        setNewPassword("");
        setOpenPasswordModal(false);
    };

    const handleChangeUsername = () => {
      if (admin) {
        if (!newUsername || !password || !securityQuestion || !security_answer || !email) {
            setErrorMessage("All fields are required");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
            return;
        }
          const data = {
              new_username: newUsername,
              email: email,
              password: password,
              security_question: securityQuestion,
              security_answer: security_answer,
          };
          adminService.setToken(admin?.token);
          adminService
              .changeAdminUsername(admin?.username, data)
              .then(() => {
                  alert("Successfully changed username!");
                  setOpenUsernameModal(false);
              })
              .catch((error) => {
                console.log(error);
                  if (error.response.data.error) {
                      setErrorMessage(error.response.data.error);
                      setTimeout(() => {
                          setErrorMessage("");
                      }, 5000);
                  } else {
                      setErrorMessage(
                          "Error changing username: Please check the console for more details"
                      );
                      console.error(error);
                      setTimeout(() => {
                          setErrorMessage("");
                      }, 5000);
                  }
              });
      }
      else if(user){
        if (!newUsername || !password || !email) {
            setErrorMessage("All fields are required");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
            return;
        }
        const data = {
            new_username: newUsername,
            email: email,
            password: password,
        };
        userService.setToken(user?.token);
        userService
                .changeUserUsername(user?.username, data)
                .then(() => {
                    alert("Successfully changed username!");
                    setOpenUsernameModal(false);
                })
                .catch((error) => {
                console.log(error);
                    if (error.response.data.error) {
                        setErrorMessage(error.response.data.error);
                        setTimeout(() => {
                            setErrorMessage("");
                        }, 5000);
                    } else {
                        setErrorMessage(
                            "Error changing username: Please check the console for more details"
                        );
                        console.error(error);
                        setTimeout(() => {
                            setErrorMessage("");
                        }, 5000);
                    }
                });
      }
      setNewUsername("");
      setPassword("");
      setSecurityQuestion("");
      setSecurityAnswer("");
      setEmail("");
      setOpenUsernameModal(false);
  };
  

    const settings = [
        {
            title: "Change Password",
            handler: handleChangePasswordOpenModal,
        },
        {
            title: "Change Username",
            handler: handleChangeUsernameOpenModal,
        },
        {
            title: "Logout",
            handler: handleLogout,
        },
    ];

    return (
        <>
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon
                            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            onClick={handleClick}
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".1rem",
                                color: "inherit",
                                textDecoration: "none",
                                cursor: "pointer", // Add cursor style
                            }}
                        >
                            Academic Performance Tracker
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                    "&:hover": {
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography textAlign="center">
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon
                            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                        />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                                flexGrow: 1,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            {/* {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))} */}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        alt="Remy Sharp"
                                        icon={<AccountCircleIcon />}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting.title}
                                        onClick={() => setting.handler()}
                                    >
                                        <Typography textAlign="center">
                                            {setting.title}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Modal
                open={openPasswordModal}
                onClose={() => setOpenPasswordModal(false)}
                aria-labelledby="change-password-modal"
                aria-describedby="change-password-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <TextField
                        label="Current Password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        onClick={handlePasswordChange}
                        variant="contained"
                        color="primary"
                    >
                        Change Password
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={openUsernameModal}
                onClose={() => setOpenUsernameModal(false)}
                aria-labelledby="change-username-modal"
                aria-describedby="change-username-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <TextField
                        label="New Username"
                        type="username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    {admin && <InputLabel id="security-question-label">
                        Security Question
                    </InputLabel>}
                    {admin && <Select
                        labelId="security-question-label"
                        value={securityQuestion}
                        onChange={(e) => setSecurityQuestion(e.target.value)}
                        fullWidth
                        margin="normal"
                    >
                        {securityQuestions.map((question, index) => (
                            <MenuItem key={index} value={question}>
                                {question}
                            </MenuItem>
                        ))}
                    </Select>}
                    {admin && <TextField
                        label="Security Answer"
                        type="text"
                        value={security_answer}
                        onChange={(e) => setSecurityAnswer(e.target.value)}
                        fullWidth
                        margin="normal"
                    />}
                    <Button
                        onClick={handleChangeUsername}
                        variant="contained"
                        color="primary"
                    >
                        Change Username
                    </Button>
                </Box>
            </Modal>
            <ErrorMessage errorMessage={errorMessage} />
        </>
    );
}

export default ResponsiveAppBar;
