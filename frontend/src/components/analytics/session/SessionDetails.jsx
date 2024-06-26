import { useEffect, useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import SideBar from "../../SideBar";
import ErrorMessage from "../../ErrorMessage";
import CardAnalytics from "../../CardAnalytics";
import services from "../../../services/admin";
import Course from '../../../assets/course_image.png';

export default function SessionDetails() {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [session, setSession] = useState([]);
  const [details, setDetails] = useState([]);
  const { user } = useLoaderData();

  useEffect(() => {
    services.setToken(user.token);
    services
        .getSession(id)
        .then((data) => {
            setSession(data);
            console.log(data);
        })
        .catch((error) => {
          setErrorMessage("Error fetching Sessions. Please check console for more details.");
          console.error(error);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        });
    services
      .getSessionDetails(id)
      .then((data) => {
        setDetails(data);
        console.log(data);
      })
      .catch((error) => {
        setErrorMessage("Error fetching Details of Session. Please check console for more details.");
        console.error(error);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });
  }, [user?.token]);

  

  return (
    <SideBar>
      <ErrorMessage errorMessage={errorMessage} />
      <Typography variant="h4" component="h4" className='typography-detail'>
        {`Courses offered in ${session.season} ${session.start_year}`}
      </Typography>
      <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                className="grid-container"
            >
                {details.map((detail) => (
                    <Grid item xs={2} sm={4} md={4} key={`${detail.course_id} ${detail.instructor_id}`} onClick={ () => handleClick(detail.id)}>
                        {/* <Item><CardAnalytics title={department.name}/></Item> */}
                        <CardAnalytics
                            title={`${detail.code} ${detail.title}`} subTitle={`${detail.name}`}
                            image_src={Course}
                        />
                    </Grid>
                ))}
            </Grid>
    </SideBar>
  );
}
