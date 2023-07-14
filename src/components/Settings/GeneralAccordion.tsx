import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, TextField, Typography } from "@mui/material";
import useSettings from "@hooks/useSettings";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { SettingsAccordionAction } from "@utils/types";

interface GeneralAccordionProps {
  expanded: boolean;
  dispatch: React.Dispatch<SettingsAccordionAction>;
}

export default function GeneralAccordion(props: GeneralAccordionProps) {
  const [apiKey, setApiKey] = useState<string>("");
  const [editApiKey, setEditApiKey] = useState<boolean>(false);
  const { settings, isLoading, error, updateAPIKey } = useSettings();
  
  useEffect(() => {
    if(!settings || isLoading || error) {
      return;
    }

    const apiKey = settings?.find(setting => {return setting.name === "ChatGPTApiKey"})
    if(apiKey) {
      setApiKey(apiKey.value);
    }
  }, [settings, isLoading, error]);

  function saveApiKey() {
    updateAPIKey(apiKey);
    setEditApiKey(false);
  }

  function resetApiKey() {
    const apiKey = settings?.find(setting => {return setting.name === "ChatGPTApiKey"})
    if(apiKey) {
      setApiKey(apiKey.value);
    }

    setEditApiKey(false);
  }

  if(isLoading) {
    return null;
  }

  return (
    <Accordion 
      expanded={props.expanded} 
      onClick={() => {props.dispatch({ type: (props.expanded ? "NONE" : "GENERAL") })}}
    >
      <AccordionSummary aria-controls="panel1d-content" id="general-accordion" expandIcon={<ExpandMoreIcon />}>
        <Typography>General</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>API Key: </Typography>
        <TextField 
          label="API Key" 
          variant="outlined"
          value={apiKey}
          disabled={!editApiKey}
          onChange={(event) => {setApiKey(event.currentTarget.value)}} />

        {editApiKey ?
        (
          <>
            <IconButton
              aria-label="save"
              onClick={saveApiKey}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
            aria-label="cancel"
            onClick={resetApiKey}
            >
              <CloseIcon />
            </IconButton>
          </>
        ) :
        (<IconButton
          aria-label="edit"
          onClick={() => {setEditApiKey(!editApiKey)}}
        >
          <EditIcon />
        </IconButton>)}
      </AccordionDetails>
    </Accordion>
  );
}