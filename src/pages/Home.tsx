import useUser from "@hooks/useUser";
import { Box, Divider, IconButton, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export default function Home() {
  const user = useUser();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      Home - {user?.email}
      <Divider style={{ marginTop: 'auto' }} />
      <TextField
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows={4}
        />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search"
        style={{ 
          position: 'absolute', 
          right: 0, 
          bottom: 0 
        }}
      >
        <SendIcon />
      </IconButton>
    </div>
  );
}
