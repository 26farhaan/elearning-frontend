import React, {useState, useEffect} from "react"
import Axios from "axios"
import mHelper from "../../helper/Helper"
import {Grid} from "@material-ui/core"
import DataGrid from "../../components/DataGrid"


export default function Pelajaran(params) {
    const hari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']
    let [dataPelajaran, setDataPelajaran] = useState([])

    const getDataMapel = () => {
        Axios.get(mHelper.URL_API() + `jadwal-pelajaran/by-siswa/${mHelper.getToken().id_kelas}`, {
          headers : {
            "x-access-token" : mHelper.getToken().token
          }
        }).then(res => {
            setDataPelajaran(res.data.data.rows)
        }).catch(error => mHelper.errorHandler(error))
    }

    const columns = [
        { field: 'jamMulai', headerName: 'Mulai'},
        {
          field: 'jamSelesai',
          headerName: 'Selesai',
        },
        {
          field: '',
          headerName: 'Pengajar',
          renderCell : (params) => {
              return params.data_pelajaran.mapelName
          }
        },
        {
          field: '',
          headerName: 'Guru',
          renderCell : (params) => {
            return params.data_pelajaran.namaPengajar
        }
        },
    ];

    useEffect(() => {
        getDataMapel()
    }, [])
    
    return (
        <div className="Paper">
            <Grid xs={12} container spacing={1}>
                {hari.map((res, index) => {
                    dataPelajaran = dataPelajaran.filter(val => val.hari === index)
                    return (
                        <Grid xs={4} item>
                            <div style={{marginRight: "10px"}}>
                                <h3>{res}</h3>
                                <DataGrid
                                    columns={columns}
                                    rows={dataPelajaran}
                                    disablePannging={true}
                                />
                            </div>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}