import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import {} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
  },
  title: {
    color: theme.palette.primary.main,
    textAlign: "center",
    marginBottom: 9,
    marginTop: 9,
    fontWeight: "bold",
  },
});

class ModalHead extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <h2 className={classes.title}>{this.props.title}</h2>
        </div>
        <Divider />
      </>
    );
  }
}

export default withStyles(styles)(ModalHead);
