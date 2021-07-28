import React from "react"
import ModalBody from "./ModalBody"
import ModalHead from "./ModalHead"
import {Grid, Button, Modal, Paper} from "@material-ui/core"

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
  rowForm: {
    width: 200
  }
}

const FormModal = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      style={{
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: "80%",
        overflow: "hidden"
      }}
    >
      <Paper
        style={{
          minWidth: "40%",
          maxWidth: "80%",
          maxHeight: "100%",
          overflow: "scroll"
        }}
      >
        <ModalHead title={props.title} />
        <ModalBody>
          <form
            initialValues={props.ref}
            size="small"
            name="control-hooks"
            onSubmit={props.onSave}
            noValidate
            {...layout}
            style={{}}
          >
            <Grid
              container
              alignItems="center"
              justify="center"
              style={{width: "auto"}}
            >
              {props.children}
            </Grid>
            {!props.withoutButton && (
              <Grid
                container
                spacing={3}
                style={{marginTop: "1rem", marginBottom: "1rem"}}
              >
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={props.onClose}
                    size="large"
                    disabled={props.cancelDisabled}
                  >
                    {props.cancelLabel || "Cancel"}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    disabled={props.submitDisabled}
                  >
                    {props.saveLabel || "Save"}
                  </Button>
                </Grid>
              </Grid>
            )}
          </form>
        </ModalBody>
      </Paper>
    </Modal>
  )
}

export default FormModal
