import { useLoaderData } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Analytics from "./Analytics";

export default function UserDashBoard () {
    const { user } = useLoaderData();
    return (
        <div>
          <CssBaseline />
          <ResponsiveAppBar />
          <div className="container-app">
            <Analytics />
          </div>
        </div>
      );
}