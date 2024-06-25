import Alert from "@mui/material/Alert";

const SuccessMessage = ({ message }) => {
    if (!message) {
        return null;
    }
    return <Alert severity="success">{message}</Alert>
};

export default SuccessMessage;