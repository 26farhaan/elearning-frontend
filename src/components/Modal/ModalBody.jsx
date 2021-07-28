import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    paddingTop: "1rem",
    paddingBottom: "1rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
  },
});

class ModalHead extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, children } = this.props;
    return (
      <>
        <div className={classes.root}>{children}</div>
      </>
    );
  }
}

export default withStyles(styles)(ModalHead);
