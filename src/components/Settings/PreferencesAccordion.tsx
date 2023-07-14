import { useContext } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Switch } from "@mui/material";
import SettingsContext from "@contexts/SettingsContext";
import { SettingsAccordionAction } from "@utils/types";

interface PreferencesAccordionProps {
  expanded: boolean;
  dispatch: React.Dispatch<SettingsAccordionAction>;
}

export default function PreferencesAccordion(props: PreferencesAccordionProps) {
  const { darkMode, toggleDarkMode } = useContext(SettingsContext);

  return (
    <Accordion 
      expanded={props.expanded} 
      onClick={() => {props.dispatch({ type: (props.expanded ? "NONE" : "PREFERENCES") })}}
    >
      <AccordionSummary aria-controls="panel1d-content" id="preferences-accordion" expandIcon={<ExpandMoreIcon />}>
        <Typography>Preferences</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>Dark Mode:</Typography>
        <Switch onChange={toggleDarkMode} checked={darkMode} />
      </AccordionDetails>
    </Accordion>
  );
}
