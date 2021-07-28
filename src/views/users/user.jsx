import React, {useEffect, useState, Fragment} from "react"
import helper from "../../helper/Helper"
import Axios from "axios"
import DataGrid from "../../components/DataGrid"
import { MenuItem, Grid, Button } from "@material-ui/core"
import GridLabelSelect from "../../components/GridLabelSelect"
import TextInput from "../../components/TextInput"
import EditIcon from '@material-ui/icons/Edit';
import FormModal from "../../components/Modal/FormModal"
import mHelper from "../../helper/Helper"
import Swal from "sweetalert2"
import Upsert from "./upsert"

export default function User (props){
    const [dataUser, setDataUser] = useState([])
    const [dataUserGuru, setDataUserGuru] = useState([])
    const [dataKelas, setDataKelas] = useState([])
    const [page, setPage] = useState(0);
    const [pageGuru, setPageGuru] = useState(0);
    const [totalData, setTotalData] = useState(0)
    const [totalDataGuru, setTotalDataGuru] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rowsPerPageGuru, setRowsPerPageGuru] = useState(5);
    const [modal, setModal] = useState(false)

    const getDataUser = (type) => {
      Axios.get(helper.URL_API() + `all-user?page=${page}&limit=${rowsPerPage}&role=${type === 'siswa' ? 3 : 2}`, {
        headers : {
          "x-access-token" : mHelper.getToken().token
        }
      }).then(res => {
        if(type === "siswa"){
          setDataUser(res.data.data.rows)
          setTotalData(res.data.data.count)
        } else {
          setDataUserGuru(res.data.data.rows)
          setTotalDataGuru(res.data.data.count)
        }
      }).catch(error => helper.errorHandler(error))
    }

    const getDataKelas = () => {
      Axios.get(helper.URL_API() + `kelas`, {
        headers : {
          "x-access-token" : mHelper.getToken().token
        }
      }).then(res => {
          setDataKelas(res.data.data.rows)
      }).catch(error => helper.errorHandler(error))
    }
    

    useEffect(() => {
      getDataKelas()
    }, [])

    useEffect(() => {
      getDataUser('siswa')
      getDataKelas()
    }, [page, rowsPerPage])
    
    useEffect(() => {
      getDataUser('guru')
    }, [pageGuru, rowsPerPageGuru])

    const columns = [
      { field: 'no', headerName: 'No', width: 90 },
      {
        field: 'fullName',
        headerName: 'Nama Lengkap',
        width: 150,
        editable: true,
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 150,
        editable: true,
      },
      {
        field: 'phoneNumber',
        headerName: 'Nomor Telefon',
        type: 'number',
        width: 110,
        editable: true,
      },
      {
        field: '',
        headerName: 'Kelas',
        type: 'number',
        width: 110,
        renderCell : (props) => {
          return props.kelas ? props.kelas.namaKelas : '' 
        }
      },
      {
        field: '',
        headerName: 'Action',
        type: '',
        align: "center",
        renderCell : (props) => {
          return <EditIcon/>
        }
      },
    ];

    const columnsKelas = [
      { field: 'no', headerName: 'No', width: 90 },
      {
        field: 'namaKelas',
        headerName: 'Nama Kelas',
        width: 150,
        editable: true,
      },
      {
        field: 'deskripsi',
        headerName: 'Deskripsi',
        width: 150,
        editable: true,
      },
    ];

    const handleSave = (e, data) => {
      if(data.role_id === 2){
        data.id_kelas = null
      }
      console.log(data)
      e.preventDefault()
      Axios.post(mHelper.URL_API() + "user/add-user", data, {
        headers : {
          "x-access-token" : mHelper.getToken().token
        }
      })
      .then(res => {
        if(res.data.success){
          setModal(false)
          setTimeout(() => {
            Swal.fire("Success", res.data.message, "success")
            getDataUser()
          }, 500);
        }
      })
      .catch(error => {
        setModal(false)
        setTimeout(() => {
          mHelper.errorHandler(error)
        }, 500);
      })
    }

    return (
      <Fragment>
        {['siswa', 'guru'].map(res => {
          return (
            <div className="Paper" style={{marginTop : res === 'guru' && "2rem"}}>
              <Grid xs={12} style={{marginBottom: "2rem"}}>
                <h2>{res === "siswa" ? "Data Siswa" : "Data Guru"}</h2>
                <hr/>
              </Grid>
              <Grid xs={12} container justify="flex-start">
                <Button variant="contained" color="primary" size="small" onClick={ () => setModal(res)}>
                  Add User
                </Button>
              </Grid>
              
              <Grid style={{marginTop : "1rem", height: "300px"}}>
                <DataGrid
                  columns={res === "guru" ? columns.filter(res => res.headerName !== "Kelas") : columns}
                  rows={res === "siswa" ? dataUser : dataUserGuru}
                  totalData={res === "siswa" ? totalData : totalDataGuru}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  setPage={(v) => res === "siswa" ? setPage(v) : setPageGuru(v)}
                  setRowsPerPage={(v) => res === "siswa" ? setRowsPerPage(v) : setRowsPerPageGuru(v)}
                />
              </Grid>
            </div>
          )
        })}
        
          {modal &&
            <Upsert
              open={modal}
              onClose={() => setModal(false)}
              onSave={handleSave}
              dataKelas={dataKelas}
            />
          }
      </Fragment>
    )
}