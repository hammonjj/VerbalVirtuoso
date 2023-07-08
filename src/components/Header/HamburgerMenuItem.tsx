import { ListItem, ListItemText } from "@mui/material";

interface HamburgerMenuItemProps {
  text: string;
  onClick: () => void;
  actions?: React.ReactNode;
}

export default function HamburgerItemMenu(props: HamburgerMenuItemProps) {
  return (
    <ListItem onClick={props.onClick} secondaryAction={props.actions}>
      <ListItemText primary={props.text} />
    </ListItem>
  );
};