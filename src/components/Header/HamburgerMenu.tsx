import { Divider, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CustomButton from '@components/CustomButton';
import AddIcon from '@mui/icons-material/Add';
import RecentConversationMenuItem from './RecentConversationMenuItem';
import PromptBoxMenuItem from './PromptBoxMenuItem';
import HamburgerSubHeader from './HamburgerSubHeader';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(true);

  const promptBoxes = ['PromptBox 1', 'PromptBox 2', 'PromptBox 3'];
  const recentConversations = ['Menu 1', 'Menu 2', 'Menu 3'];

  const toggleDrawer = (isOpen: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(isOpen);
  };

  return (
    <div>
      <IconButton 
        edge="start" 
        color="inherit" 
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor={'left'} open={open} onClose={toggleDrawer(false)}>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <List>
          <ListItem>
            <CustomButton onClick={() => {}}/>
          </ListItem>
          <HamburgerSubHeader text="Recent Conversations" />
          {recentConversations.map((text, index) => (
            <RecentConversationMenuItem summary={text} conversationId={text} key={index} />
          ))}

          <Divider />
          <HamburgerSubHeader 
            text="Prompt Boxes" 
            actions={
              <IconButton edge="end" aria-label="add-prompt-box">
                <AddIcon />
              </IconButton>}
          />
          {promptBoxes.map((text, index) => (
            <PromptBoxMenuItem summary={text} promptBoxId={text} key={index} />
          ))}
        </List>
        <Divider style={{ marginTop: 'auto' }} />
        <List >
          <ListItem>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
        </div>
      </Drawer>
    </div>
  );
}
