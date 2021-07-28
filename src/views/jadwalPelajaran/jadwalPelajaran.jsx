import React, {Fragment, useState, useEffect} from "react";
import {Grid, Button} from "@material-ui/core"
import DataGrid from "../../components/DataGrid";
import Axios from "axios"
import mHelper from "../../helper/Helper";
import Upsert from "./upsert";

export default function JadwalPelajaran(params) {
    const [dataMapel, setDataMapel] = useState([])
    const [JadwalPelajaran, setJadwalPelajaran] = useState([])
    const [modal, setModal] = useState(false)
    const [dataKelas, setDataKelas] = useState([])
    const hari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']

    const getJadwalPelajaran = () => {
        Axios.get(mHelper.URL_API() + `jadwal-pelajaran`, {
          headers : {
            "x-access-token" : mHelper.getToken().token
          }
        }).then(res => {
            setJadwalPelajaran(res.data.data.rows)
        }).catch(error => mHelper.errorHandler(error))
    }

    const getDataMapel = () => {
      Axios.get(mHelper.URL_API() + `mata-pelajaran`, {
        headers : {
          "x-access-token" : mHelper.getToken().token
        }
      }).then(res => {
          setDataMapel(res.data.data.rows)
      }).catch(error => mHelper.errorHandler(error))
    }
    
    const columns = [
        { field: 'no', headerName: 'No', width: 90 },
        {
          field: '',
          headerName: 'Kelas',
          width: 150,
          renderCell : (params) => {
              return params.data_kelas.namaKelas
          }
        },
        {
          field: '',
          headerName: 'Hari',
          width: 150,
          renderCell : (params) => {
              return hari[params.hari]
          }
        },
        {
          headerName: 'Mata Pelajaran',
          type: 'number',
          width: 110,
          renderCell : (params) => {
              return params.data_pelajaran.mapelName 
          }
        },
        {
          field: 'jamMulai',
          headerName: 'Jam Mulai',
          type: 'number',
          width: 110,
        },
        {
          field: 'jamSelesai',
          headerName: 'Jam Selesai',
          type: 'number',
          width: 110,
        },
        {
          field: '',
          headerName: 'Pengajar',
          type: 'number',
          width: 110,
          renderCell : (params) => {
              return params.data_pelajaran.namaPengajar
          }
        },
    ];

    const getDataKelas = () => {
      Axios.get(mHelper.URL_API() + `kelas`, {
        headers : {
          "x-access-token" : mHelper.getToken().token
        }
      }).then(res => {
          setDataKelas(res.data.data.rows)
      }).catch(error => mHelper.errorHandler(error))
  }

    useEffect(() => {
        getJadwalPelajaran()
        getDataKelas()
        getDataMapel()
    }, [])

    return (
      <React.Fragment>
        <div className="Paper">
            <Grid xs={12} style={{marginBottom: "2rem"}}>
                <h2>Jadwal Pelajaran</h2>
                <hr/>
            </Grid>
            <Grid xs={12} container justify="flex-start" style={{marginBottom: "1rem"}}>
                <Button variant="contained" color="primary" size="small" onClick={() => setModal(true)}>
                  Tambah jadwal pelajaran
                </Button>
              </Grid>
            <Grid xs={12}>
                <DataGrid
                    columns={columns}
                    rows={JadwalPelajaran}
                />
            </Grid>
        </div>
        {modal && <Upsert
          open={modal}
          dataKelas={dataKelas}
          dataMapel={dataMapel}
          getJadwalPelajaran={() => getJadwalPelajaran()}
          onClose={() => setModal(false)}
        />}
      </React.Fragment>
    )
}