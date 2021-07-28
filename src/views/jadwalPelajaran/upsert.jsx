import React, {useState, useEffect} from "react"
import {Grid, MenuItem} from "@material-ui/core"
import FormModal from "../../components/Modal/FormModal"
import TextInput from "../../components/TextInput"
import GridLabelSelect from "../../components/GridLabelSelect"
import helper from "../../helper/Helper"
import Axios from "axios"
import Swal from "sweetalert2"
const hari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']

export default function Upsert(props) {
    const {open, onClose, dataKelas, dataMapel, getDataKelas, getJadwalPelajaran} = props
    const [body, setBody] = useState({
        hari : 0,
        kelas : dataKelas[0].id,
        jamMulai : "",
        jamSelesai: "",
        mataPelajaran : dataMapel[0].id
    })

    const onSave = (e) => {
        e.preventDefault()
        if(body.jamMulai === "" || body.jamSelesai === ""){
            onClose()
            Swal.fire("Error", "Jam mulai dan Jam selesai pelajaran tidak boleh kosong", "error")
        } else {
            Axios.post(helper.URL_API() + "jadwal-pelajaran", body, {
                headers : {
                  "x-access-token" : helper.getToken().token
                }
              })
              .then(res => {
                if(res.data.success){
                    onClose()
                    Swal.fire("Success", res.data.message, "success")
                    getJadwalPelajaran()
                }
              })
        }
    }
    

    return (
        <FormModal
            open={open}
            onClose={onClose}
            onSave={(e) => onSave(e)}
            title="Add User"
          >
              <Grid xs={12} style={{width : "800px"}} container>
                <Grid xs={6} item>
                    <GridLabelSelect
                        label="hari"
                        fullWidth={true}
                        labelWidth={4}
                        fieldWidth={6}
                        value={body.hari}
                        onChange={(e) => setBody({...body, hari : e.target.value})}
                    >
                        {hari.map((res, i) => <MenuItem value={i}>{res}</MenuItem>)}
                    </GridLabelSelect>
                </Grid>
                <Grid xs={3} item style={{paddingTop: "15px"}}>
                    <span>Start</span>
                    <input value={body.jamMulai} style={{marginLeft: "20px"}} type="time" onChange={(e) => setBody({...body, jamMulai : e.target.value})}/>
                </Grid>
                <Grid xs={3} item style={{paddingTop: "15px"}}>
                    <span>End</span>
                    <input value={body.jamSelesai} onChange={(e) => setBody({...body, jamSelesai : e.target.value})} style={{marginLeft: "20px"}} type="time" />
                </Grid>
                <Grid xs={6} item>
                    <GridLabelSelect
                        label="Mata Pelajaran"
                        fullWidth={true}
                        labelWidth={4}
                        fieldWidth={6}
                        value={body.mataPelajaran}
                        onChange={(e) => setBody({...body, mataPelajaran : e.target.value})}
                    >
                        {dataMapel.map((res) => <MenuItem value={res.id}>{res.mapelName}</MenuItem>)}
                    </GridLabelSelect>
                </Grid>
                <Grid xs={6} item>
                    <GridLabelSelect
                        label="Kelas"
                        fullWidth={true}
                        labelWidth={4}
                        fieldWidth={8}
                        value={body.kelas}
                        onChange={(e) => setBody({...body, kelas : e.target.value})}
                    >
                        {dataKelas.map((res) => <MenuItem value={res.id}>{res.namaKelas}</MenuItem>)}
                    </GridLabelSelect>
                </Grid>
              </Grid>
        </FormModal>
    )
}