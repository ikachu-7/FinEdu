import Navbar from "../Navbar";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import PaidIcon from "@mui/icons-material/Paid";
import DatePicker from "./DatePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Divider from "@mui/material/Divider";
import Item from "@mui/material/ListItem";
import ExpenseChart from "./ExpenseChart";
import ExpenseTable from "./ExpenseTable";
import * as React from "react";

export default function Dashboard() {
  const [type, setType] = React.useState(1);
  const [amount, setAmount] = React.useState(0);
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [transaction, setTransaction] = React.useState([]);
  console.log(type, amount, name, date);
  console.log(transaction);
  return (
    <div className="bg-white">
      <Navbar />
      <Paper
        elevation={3}
        className="mx-auto max-w-7xl px-6 lg:px-8"
        sx={{
          marginTop: "100px",
          padding: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack spacing={5}>
          <Item>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Item>
                <Stack
                  spacing={5}
                  sx={{
                    display: "flex",
                    justifyContent: "centre",
                    alignItems: "centre",
                  }}
                >
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Select Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="Select the type"
                      defaultValue={1}
                      onChange={(e) => setType(e.target.value)}
                      value={type}
                    >
                      <MenuItem value={1}>Credit</MenuItem>
                      <MenuItem value={2}>Debit</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="standard-basic"
                    label="Enter the name"
                    variant="standard"
                    sx={{ width: "400px" }}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      Enter the amount
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <PaidIcon />
                        </InputAdornment>
                      }
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                    />
                  </FormControl>
                  <DatePicker changeDate={setDate} />
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => {
                      setTransaction([
                        ...transaction,
                        { type, name, amount, date },
                      ]);
                      setAmount("");
                      setName("");
                      setDate("");
                    }}
                  >
                    Add Transaction
                  </Button>
                </Stack>
              </Item>
              <Item>
                <ExpenseChart data={transaction} />
              </Item>
            </Stack>
          </Item>
          <Item>
            <ExpenseTable data={transaction} />
          </Item>
        </Stack>

        {/* <ExpenseTable /> */}
      </Paper>
    </div>
  );
}
