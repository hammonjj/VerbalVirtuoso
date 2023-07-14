import { Button, Divider, Drawer, IconButton, List, ListItem, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CustomButton from '@components/CustomButton';
import AddIcon from '@mui/icons-material/Add';
import RecentConversationMenuItem from './RecentConversationMenuItem';
import PromptBoxMenuItem from './PromptBoxMenuItem';
import HamburgerSubHeader from './HamburgerSubHeader';
import Settings from '@pages/Settings';
import DialogShell from '@components/Dialogs/DialogShell';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@utils/supabaseClient';
import { isMobileDevice } from '@utils/helpers';
import CreatePromptBoxDialog from '@components/Dialogs/CreatePromptBoxDialog';

interface IHamburgerMenuProps {
  isMobileDevice: boolean;
}

export default function HamburgerMenu(props: IHamburgerMenuProps) {
  const queryClient = useQueryClient();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [createPromptBoxDialogOpen, setCreatePromptBoxDialogOpen] = useState(false);

  const promptBoxes = ['PromptBox 1', 'PromptBox 2', 'PromptBox 3'];
  const recentConversations = ['Menu 1', 'Menu 2', 'Menu 3'];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerClose = () => {
    setAnchorEl(null);
  };

  function handleSettingsClick() {
    setSettingsDialogOpen(true);
    handleDrawerClose();
  }

  async function signOut() {
    queryClient.invalidateQueries();
    supabase.auth.signOut();
  }
  
  function toggleDrawer(isOpen: boolean) {
    return (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
  
      setDrawerOpen(isOpen);
    };
  }

  return (
    <>
      <CreatePromptBoxDialog open={createPromptBoxDialogOpen} setOpen={setCreatePromptBoxDialogOpen} />
      <DialogShell 
        title="Settings" 
        open={settingsDialogOpen} 
        setOpen={setSettingsDialogOpen}
      >
        <Settings />
      </DialogShell>
      <div>
        {isMobileDevice() && (<IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>)}
        <Drawer 
          anchor={'left'} 
          open={drawerOpen} 
          onClose={toggleDrawer(false)} 
          variant={props.isMobileDevice ? 'temporary' : 'permanent'}
        >
          <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <List>
              <ListItem>
                <CustomButton onClick={() => {} } label="New Chat" />
              </ListItem>
              <HamburgerSubHeader text="Recent Conversations" />
              {recentConversations.map((text, index) => (
                <RecentConversationMenuItem summary={text} conversationId={text} key={index} />
              ))}
              <Divider />
              <HamburgerSubHeader
                text="Prompt Boxes"
                actions={
                  <IconButton edge="end" aria-label="add-prompt-box"
                    onClick={() => {setCreatePromptBoxDialogOpen(true)} }
                  >
                    <AddIcon />
                  </IconButton>} 
                />
              {promptBoxes.map((text, index) => (
                <PromptBoxMenuItem summary={text} promptBoxId={text} key={index} />
              ))}
            </List>
            <Divider style={{ marginTop: 'auto' }} />
            <Button
              id="profile-button"
              onClick={handleClick}
            >
              Dashboard
            </Button>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleDrawerClose}
            >
              <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
              <MenuItem onClick={signOut}>Logout</MenuItem>
            </Menu>
          </div>
        </Drawer>
      </div>
    </>
  );
}
