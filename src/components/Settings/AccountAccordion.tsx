import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography, IconButton, Button } from "@mui/material";
import useUser from "@hooks/useUser";
import EditIcon from '@mui/icons-material/Edit';
import EditEmailDialog from "@components/Dialogs/EditEmailDialog";
import { supabase } from "@utils/supabaseClient";
import useToast from "@hooks/useToast";
import { SettingsAccordionAction } from "@utils/types";

interface AccountAccordionProps {
  expanded: boolean;
  dispatch: React.Dispatch<SettingsAccordionAction>;
}

export default function AccountAccordion(props: AccountAccordionProps) {
  const user = useUser();
  const { showError, showSuccess } = useToast();

  const [editEmailModalOpen, setEditEmailModalOpen] = useState(false);

  async function onPasswordUpdate() {
    const { error } = await supabase.auth.resetPasswordForEmail(
      user?.email ?? "",
      { redirectTo: "http://rfuelr.netlify.app/change-password" }
    );
    
    if(error) {
      showError("Unable to send password reset email: " + error.message);
    } else {
      showSuccess("Password Reset Email Sent - Check your spam folder if you don't see it in your inbox");
    }
  }
  
  return (
    <>
      <EditEmailDialog 
        open={editEmailModalOpen} 
        currentEmail={user?.email ?? ""} 
        handleClose={() => setEditEmailModalOpen(false)} 
      />
      <Accordion 
        expanded={props.expanded} 
        onClick={() => {props.dispatch({ type: (props.expanded ? "NONE" : "ACCOUNT") })}}
      >
        <AccordionSummary aria-controls="panel1d-content" id="account-accordion" expandIcon={<ExpandMoreIcon />}>
          <Typography>Account</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>{user?.email}</Typography>
          <IconButton
            aria-label="edit"
            onClick={() => setEditEmailModalOpen(true)}
          >
            <EditIcon />
          </IconButton>
        </AccordionDetails>
        <AccordionDetails style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>Update Password</Typography>
          <Button onClick={onPasswordUpdate}>Send Secure Email</Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
}