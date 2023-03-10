import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  SvgIcon,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
  Box,
} from "@mui/material";

import { ReactComponent as FormIcon } from "../assets/images/Form.svg";
import { Link } from "react-router-dom";

import * as Api from "../Api";
import { connect } from "react-redux";
import * as action from "../store/actions/actions";

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (data) => dispatch(action.getUsers(data)),
  };
};

function Navbar({ getUsers, users }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    Api.getUsers().then((data) => {
      getUsers(data);
    });
  }, []);

  const handleOnSelect = (event) => {
    let val = "";
    if (event.target.value !== "Admin") val = event.target.value;
    setUser(val);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        component="nav"
        position="fixed"
        sx={{ backgroundColor: "#ffffff" }}
      >
        <Toolbar>
          <SvgIcon component={FormIcon} inheritViewBox />

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "#5f6871",
              display: { xs: "none", sm: "block" },
              paddingLeft: 3,
            }}
          >
            Forms
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Button
                onClick={handleOnSelect}
                value={"Admin"}
                sx={{ color: "#5f6871" }}
              >
                Admin
              </Button>
            </Link>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Users</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={user}
                label="user"
                onChange={handleOnSelect}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}

                {users.map((user) => {
                  return (
                    <MenuItem key={user.id} value={user.user_name}>
                    <Link
                      to={`user/${user.id}`}
                      style={{ textDecoration: "none" }}
                    >
                        {user.user_name}
                    </Link>
                      </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
