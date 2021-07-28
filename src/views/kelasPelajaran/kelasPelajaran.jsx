import React, {useEffect, useState, Fragment} from "react"
import DataGrid from "../../components/DataGrid"
import {Grid, Button} from "@material-ui/core"
import mHelper from "../../helper/Helper"
import Axios from "axios"
import Upsert from "./upsert"

export default function KelasPelajaran(props) {
    const [dataMapel, setDataMapel] = useState([])
    const [dataKelas, setDataKelas] = useState([])
    const [dataMapelTotal, setDataMapelTotal] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [modal, setModal] = useState()
    const [guru, setGuru] = useState()

    const getDataMapel = () => {
        Axios.get(mHelper.URL_API() + `mata-pelajaran?page=${page}&limit=${rowsPerPage}`, {
          headers : {
            "x-access-token" : mHelper.getToken().token
          }
        }).then(res => {
            setDataMapel(res.data.data.rows)
            setDataMapelTotal(res.data.data.count)
        }).catch(error => mHelper.errorHandler(error))
    }

    const getDataUser = (type) => {
        Axios.get(mHelper.URL_API() + `all-user?role=2`, {
          headers : {
            "x-access-token" : mHelper.getToken().token
          }
        }).then(res => {
            setGuru(res.data.data.rows)
        }).catch(error => mHelper.errorHandler(error))
      }

    const getDataKelas = () => {
        Axios.get(mHelper.URL_API() + `kelas`, {
          headers : {
            "x-access-token" : mHelper.getToken().token
          }
        }).then(res => {
            setDataKelas(res.data.data.rows)
            // setDataMapelTotal(res.data.data.count)
        }).catch(error => mHelper.errorHandler(error))
    }

    useEffect(() => {
        getDataMapel()
        getDataKelas()
        getDataUser()
    }, [])

    const columnsMapel = [
        { field: 'no', headerName: 'No', width: 90 },
        {
          field: 'mapelName',
          headerName: 'Nama Mata Pelajaran',
          width: 150,
          editable: true,
        },
        {
          field: 'description',
          headerName: 'Description',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: '',
          headerName: 'Pengajar',
          type: 'number',
          width: 110,
          renderCell : (params) => {
              return params.pengajar && params.pengajar.fullName
          }
        },
    ];

    const columnsKelas = [
        { field: 'no', headerName: 'No', width: 90 },
        {
          field: 'namaKelas',
          headerName: 'Nama Mata Pelajaran',
          width: 150,
          editable: true,
        },
        {
          field: 'deskripsi',
          headerName: 'Description',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: '',
          headerName: 'Wali Kelas',
          type: 'number',
          width: 110,
          renderCell : (params) => {
              return params.wali_kelas && params.wali_kelas.fullName
          }
        },
    ];

    return (
        <Fragment>
            <Grid xs={12} container>
                <Grid xs={5} item>
                    <div className="Paper" style={{marginRight: "10px"}}>
                        <Grid xs={12} style={{marginBottom: "2rem"}}>
                            <h2>Mata Pelajaran</h2>
                            <hr/>
                        </Grid>
                        <Grid xs={12} container justify="flex-start">
                            <Button variant="contained" onClick={() => setModal("mapel")} color="primary" size="small">
                            Add Mapel
                            </Button>
                        </Grid>
                        
                        <Grid style={{marginTop : "1rem", height: "250px"}}>
                            <DataGrid
                                columns={columnsMapel}
                                rows={dataMapel}
                                // totalData={totalDataKelas}
                                // rowsPerPage={rowsPerPageKelas}
                                // page={pageKelas}
                                // setPage={(v) => setPageKelas(v)}
                                // setRowsPerPage={(v) => setRowsPerPageKelas(v)}
                            />
                        </Grid>
                    </div>
                </Grid>
                <Grid xs={7} item>
                    <div className="Paper">
                        <Grid xs={12} style={{marginBottom: "2rem"}}>
                            <h2>Kelas</h2>
                            <hr/>
                        </Grid>
                        <Grid xs={12} container justify="flex-start">
                            <Button variant="contained" onClick={() => setModal("kelas")} color="primary" size="small">
                            Add Kelas
                            </Button>
                        </Grid>
                        
                        <Grid style={{marginTop : "1rem", height: "250px"}}>
                            <DataGrid
                                columns={columnsKelas}
                                rows={dataKelas}
                                // totalData={totalDataKelas}
                                // rowsPerPage={rowsPerPageKelas}
                                // page={pageKelas}
                                // setPage={(v) => setPageKelas(v)}
                                // setRowsPerPage={(v) => setRowsPerPageKelas(v)}
                            />
                        </Grid>
                    </div>
                </Grid>
            </Grid>

            {modal &&
                <Upsert
                open={modal}
                onClose={() => setModal()}
                getDataMapel={() => getDataMapel()}
                getDataKelas={() => getDataKelas()}
                guru={guru}
            />}

        </Fragment>
    )
}