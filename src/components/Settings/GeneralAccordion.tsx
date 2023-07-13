import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Typography } from "@mui/material";
import useSettings from "@hooks/useSettings";

export default function GeneralAccordion() {
  const { settings, isLoading } = useSettings();
  const [expanded, setExpanded] = useState(false);
  
  if(isLoading) {
    return null;
  }

  const apiKey = settings?.find(setting => {return setting.name === "ChatGPTApiKey"})

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} >
      <AccordionSummary aria-controls="panel1d-content" id="vehicle-accordion" expandIcon={<ExpandMoreIcon />}>
        <Typography>General</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>API Key: {apiKey ? "****************" : ""}</Typography>
        <IconButton
          aria-label="edit"
          onClick={() => {}}
        >
          <EditIcon />
        </IconButton>
      </AccordionDetails>
    </Accordion>
  );
}