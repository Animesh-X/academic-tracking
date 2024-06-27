import { Box, Button, CssBaseline, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomThemeProvider from "./components/CustomThemeProvider";
import College from "../src/assets/demo.jpg";
import './App.css';

export default function App() {
  const navigate = useNavigate();
  return (
    <CustomThemeProvider>
      <Box sx={{ flexGrow: 1, height: '100vh' }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid item xs={6} sx={{ height: '100%' }}>
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Content for the first box */}
              <img src={College} alt="College" style={{ maxWidth: '100%', maxHeight: '100%', height: '100vh', width: '100%' }} />
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ height: '100%' }}>
            <Box sx={{ height: '100%'}}>
              {/* Content for the second box */}
              <Typography variant="h3" sx={{ml: 0, mt: 4, mb: 4}}>Academic Performance Tracker</Typography>
              <Button onClick={() => navigate(`/admin/signin`)}>Admin</Button>
              <Button onClick={() => navigate(`/signin`)}>User</Button>
              <Button onClick={() => navigate(`/student/signin`)}>Student</Button>
              <Typography sx={{}} variant="subtitle1">Please select Login method</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </CustomThemeProvider>
  );
}
