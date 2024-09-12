import React, { useState } from "react";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography, Divider } from "@mui/material";
import { DirectionsCar } from "@mui/icons-material";
import './Notifications.css';

function Notifications() {
  const [notifications] = useState([
    {
      id: 1,
      message: "Rahul shown interest in Swift Dezire car",
      timestamp: "5 minutes ago",
      user: "Rahul",
    },
    {
      id: 2,
      message: "Priya inquired about Honda City car",
      timestamp: "10 minutes ago",
      user: "Priya",
    },
    {
      id: 3,
      message: "Anil made an offer on Hyundai i20",
      timestamp: "30 minutes ago",
      user: "Anil",
    },
  ]);

  return (
    <div className="notifications-container">
      <Typography variant="h5" className="notifications-title">Notifications</Typography>
      <List>
        {notifications.map((notification) => (
          <React.Fragment key={notification.id}>
            <ListItem className="notification-item">
              <ListItemAvatar>
                <Avatar>{notification.user[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={notification.message}
                secondary={notification.timestamp}
              />
              <DirectionsCar className="car-icon" />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default Notifications;
