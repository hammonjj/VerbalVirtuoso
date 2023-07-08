import { ListItem, Typography } from "@mui/material";

interface HamburgerSubHeaderProps {
  text: string;
  actions?: React.ReactNode;
}

export default function HamburgerSubHeader(props: HamburgerSubHeaderProps) {
  return (
    <ListItem secondaryAction={props.actions}>
      <Typography variant="subtitle2" gutterBottom>
        {props.text}
      </Typography>
    </ListItem>
  );
}