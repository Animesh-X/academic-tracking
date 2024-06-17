import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  // backgroundColor: "red"
}));

export default function InteractiveList(props) {
  const [secondary, setSecondary] = React.useState(props.showSecondary);
  const [showDeleteOption, setShowDeleteOption] = React.useState(props.showDeleteOption);


  const user = JSON.parse(
    localStorage.getItem("loggedAcademicTrackingAdmin") ||
    localStorage.getItem("loggedAcademicTrackingUser")
  );

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752, ml: 4 }}>
          <Typography sx={{ mt: 4, mb: 2, }} variant="h4" component="div">
            {props.header}
          </Typography>
          <Demo>
            <List>
              {props.data.map((item) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    user?.type === "administrator" && showDeleteOption ? (
                      <IconButton edge="end" aria-label="delete" onClick={(event) => props.handleDeleteClick(item.id, event)}>
                        <DeleteIcon />
                      </IconButton>
                    ) : null
                  }
                  onClick={() => props.handleClick(item.id, item.secId)}
                  sx={{ cursor: 'pointer', mb: 2}}
                >
                  <ListItemAvatar>
                    <Avatar>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.primaryText}
                    secondary={secondary ? item.secondaryText : null}
                  />
                </ListItem>
              ))}
            </List>
          </Demo>
    </Box>
  );
}
