import { IconButton } from "@mui/material";
import HamburgerItemMenu from "./HamburgerMenuItem";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

interface PromptBoxMenuItemProps {
  promptBoxId: string;
  summary: string;
}

export default function PromptBoxMenuItem(props: PromptBoxMenuItemProps) {
  return (
    <HamburgerItemMenu 
      text={props.summary} 
      onClick={() => {}} 
      actions={
        <>
          <IconButton edge="end" aria-label="comments">
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="comments">
            <DeleteOutlineIcon />
          </IconButton>
        </>}
    />);
}