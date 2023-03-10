import {
  Container,
  Box,
  Tooltip,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

import FormCard from "./Card";

import * as Api from "../Api";
import { connect } from "react-redux";
import * as action from "../store/actions/actions";
import { useEffect } from "react";

const mapStateToProps = (state) => {
  return {
    forms: state.forms,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getForms: (data) => dispatch(action.getForms(data)),
  };
};

//const Form = ["Form1", "Form2", "Form3", "Form4", "Form5", "Form6"];

function Admin({ forms, getForms }) {
  useEffect(() => {
    Api.getForms().then((data) => {
      // console.log(data);
      getForms(data);
    });
  }, []);

  return forms.length === 0 ? (
    <Stack alignItems="center" margin="5em" >
      <CircularProgress />
    </Stack>
  ) : (
    <Box
      component="div"
      sx={{ backgroundColor: "#f1f3f4", minHeight: "90vh", padding: "5em",marginTop:'3em' }}
    >
      <Container
        component="div"
        sx={{ display: "flex", flexWrap: "wrap", gap: "2em" }}
      >
        <Tooltip title="Create form">
          <Link to={"/form"}>
            <FormCard
              image={
                "https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png"
              }
            />
          </Link>
        </Tooltip>
        {forms &&
          forms.map((form, index) => {
            //console.log(form);
            return (
              <Link
                to={`/form/${form.form_id}`}
                key={form.form_id}
                style={{ textDecoration: "none" }}
              >
                <FormCard title={form.form_name} />
              </Link>
            );
          })}
      </Container>
    </Box>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

// <Box sx={{ backgroundColor: "#f1f3f4" , minHeight:"100%"}}>
// <Container>
//   <FormCard title={"Create"} />
//   {Form.map((title) => {
//     return <FormCard title={title} />;
//   })}
// </Container>
// </Box>
