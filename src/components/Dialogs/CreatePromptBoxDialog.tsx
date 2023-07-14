import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { Box, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { ChatGPTModel, ChatGPTModelValues } from "@utils/types";

interface CreatePromptBoxDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreatePromptBoxDialog(props: CreatePromptBoxDialogProps) {
  const [name, setName] = useState("");
  const [preprompt, setPreprompt] = useState("");
  const [model, setModel] = useState<ChatGPTModel | null>("");
  const [temperature, setTemperature] = useState<number | null>(0.5);

  function handleChange(event: SelectChangeEvent<ChatGPTModel>) {
    setModel(event.target.value);
  }

  return (
    <ConfirmDialog
      title={"Create Prompt Box"}
      open={props.open}
      setOpen={props.setOpen}
      onConfirm={() => {}}
    >
      <Box display="flex" flexDirection="column" gap="1rem">
        <TextField
          value={name}
          label="Name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <Box display="flex" gap="1rem">
          <Box style={{ flex: "3" }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={model || ""}
              label="Model"
              onChange={handleChange}
              fullWidth
            >
              {Object.values(ChatGPTModelValues).map((modelOption) => (
                <MenuItem key={modelOption} value={modelOption}>
                  {modelOption}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box style={{ flex: "1" }}>
            <TextField
              value={temperature || ""}
              label="Temperature"
              type="number"
              inputProps={{
                min: 0,
                max: 1,
                step: 0.1,
              }}
              onChange={(event) => {
                setTemperature(parseFloat(event.target.value) || null);
              }}
              fullWidth
            />
          </Box>
        </Box>

        <TextField
          value={preprompt}
          label="Preprompt"
          multiline
          minRows={4}
          onChange={(event) => {
            setPreprompt(event.target.value);
          }}
        />
      </Box>
    </ConfirmDialog>
  );
}
