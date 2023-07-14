import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface DialogShellProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogShell(props: DialogShellProps) {
  const { title, children, open, setOpen } = props;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle id="dialog-shell-dialog">
        {title}
        <IconButton 
          aria-label="close" 
          style={{ position: 'absolute', right: '8px', top: '8px' }}
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </IconButton>  
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
