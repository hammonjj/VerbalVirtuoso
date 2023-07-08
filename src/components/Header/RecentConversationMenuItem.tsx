import { IconButton } from "@mui/material";
import HamburgerItemMenu from "./HamburgerMenuItem";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface RecentConversationMenuItemProps {
  conversationId: string;
  summary: string;
}

export default function RecentConversationMenuItem(props: RecentConversationMenuItemProps) {
  return (
    <HamburgerItemMenu 
      text={props.summary} 
      onClick={() => {}} 
      actions={
        <IconButton edge="end" aria-label="comments">
          <DeleteOutlineIcon />
        </IconButton>}
    />);
}