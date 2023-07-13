import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

interface CustomButtonProps {
  onClick: () => void;
  label: string;
}

export default function CustomButton(props: CustomButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={props.onClick}
      style={{ 
        width: 200, 
        padding: '5px 0', 
        paddingLeft: 20,
        borderRadius: 5,
        justifyContent: 'flex-start'
       }}
    >
      {props.label}
    </Button>
  );
};
