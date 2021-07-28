import React, {useState, useEffect} from "react"
import {Grid, MenuItem} from "@material-ui/core"
import FormModal from "../../components/Modal/FormModal"
import TextInput from "../../components/TextInput"
import GridLabelSelect from "../../components/GridLabelSelect"
import helper from "../../helper/Helper"
import Axios from "axios"
import Swal from "sweetalert2"

export default function Upsert(props) {
    const [mapel, setMapel] = useState({
        mapelName : "",
        description : "",
        id_pengajar : null
    })
    const [kelas, setKelas] = useState({
        namaKelas : "",
        description : "",
        waliKelas : null
    })
    const {open, onClose, guru, dataKelas, getDataMapel, getDataKelas} = props
    const onSave = (e) => {
        onClose()
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Axios.post(helper.URL_API() + (open === "mapel" ? "mata-pelajaran" : "kelas"), (open === "mapel" ? mapel : kelas)).then(res => {
                  Swal.fire(res.data.success ? "Success" : "Error", res.data.message, res.data.success ? "success" : "error")
                  open === "mapel" ? getDataMapel() : getDataKelas()
              })
            }
          })
    }

    return (
        <FormModal
            open={open}
            onClose={onClose}
            onSave={(e) => onSave(e)}
            title="Add User"
          >
            {open === "mapel" ?
            <Grid xs={12} container style={{width : "800px"}}>
                <Grid xs={12} item>
                    <TextInput
                    label="Nama mata pelajaran"
                    placeholder="mata pelajaran"
                    onChange={(e) => setMapel({...mapel, mapelName : e.target.value})}
                    />
                </Grid>
                <Grid xs={12} item>
                    <TextInput
                    label="description"
                    placeholder="description"
                    onChange={(e) => setMapel({...mapel, description : e.target.value})}
                    />
                </Grid>
                <Grid xs={12} item>
                    <GridLabelSelect
                    label="Pengajar"
                    labelWidth={3}
                    fieldWidth={4}
                    onChange={(e) => setMapel({...mapel, id_pengajar : e.target.value})}
                    >
                        {guru.map(res => {
                            return (
                            <MenuItem value={res.id}>{res.fullName}</MenuItem>
                            )
                        })}
                    </GridLabelSelect>
                </Grid>
            </Grid> : 
            <Grid xs={12} container style={{width : "800px"}}>
                <Grid xs={12} item>
                    <TextInput
                        label="Nama kelas"
                        placeholder="nama kelas"
                        onChange={(e) => setKelas({...kelas, namaKelas : e.target.value})}
                    />
                </Grid>
                <Grid xs={12} item>
                    <TextInput
                        label="description"
                        placeholder="description"
                        onChange={(e) => setKelas({...kelas, description : e.target.value})}
                    />
                </Grid>
                <Grid xs={12} item>
                    <GridLabelSelect
                        label="Wali Kelas"
                        labelWidth={3}
                        fieldWidth={4}
                        onChange={(e) => setKelas({...kelas, waliKelas : e.target.value})}
                    >
                        {guru.map(res => {
                            return (
                                <MenuItem value={res.id}>{res.fullName}</MenuItem>
                            )
                        })}
                    </GridLabelSelect>
                </Grid>
            </Grid>
             }
        </FormModal>
    )
}