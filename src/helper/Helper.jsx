import Cookie from "js-cookie"
import Swal from "sweetalert2"

class Helper {
  URL_API = () => {
    return "http://localhost:5000/api/v1/"
  }

  getToken = () => {
    return Cookie.getJSON("user")
  }

  errorHandler = (error) => {
    console.log("error +++", error.response)
    if (
      error.response &&
      error.response.data.errors
    ) {
      if (error.response.status === 409) {
        // return new Error("Resource already exists")
        Swal.fire("Oops!", "Resource already exists", "error")
      }
      let strError = ""
      for (const err of error.response.data.errors) {
        strError += err.param + " : " + err.msg + "<br/>"
      }
      Swal.fire("Oops!", strError, "error")
      // return new Error(strError)
    } else if (error.response.status === 401) {
      window.location.href = "/"
    } else if (error.response.status === 404) {
      Swal.fire("Oops!", "URL tidak ditemukan!", "error")
    } else if (error.response) {
      if(error.response.data){
        Swal.fire("Oops!", error.response.data.message, "error")
      } else {
        Swal.fire("Oops!", "Error", "error")
      }
    } else {
      return error
    }
  }
}

const mHelper = new Helper()
export default mHelper