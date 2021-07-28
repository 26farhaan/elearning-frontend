import React, {useState} from "react"
import {Grid, MenuItem} from "@material-ui/core"
import FormModal from "../../components/Modal/FormModal"
import TextInput from "../../components/TextInput"
import GridLabelSelect from "../../components/GridLabelSelect"

export default function Upsert(props) {
    const {open, onSave, onClose, dataKelas} = props
    console.log(props.open)
    const initialData = {
        fullName : "",
        username : "",
        email : "",
        password : "",
        role_id : open === "siswa" ? 3 : 2,
        phoneNumber : 0,
        id_kelas :dataKelas.length > 0 ? dataKelas[0].id : null
      }
    const [addUser, setAddUser] = useState(props.dataEdit || initialData)
    

    return (
        <FormModal
            open={open}
            onClose={onClose}
            onSave={(e) => onSave(e, addUser)}
            title="Add User"
          >
            <Grid container xs={12} style={{width: "800px"}}>
                <Grid item xs={6}>
                <TextInput
                    labelWidth={4}
                    inputWidth={8}
                    id="fullName"
                    label="Nama Lengkap"
                    placeholder="Nama Lengkap"
                    onChange={(e) => setAddUser({...addUser, fullName : e.target.value})}
                />
                </Grid>
                <Grid item xs={6}>
                <TextInput
                    labelWidth={4}
                    inputWidth={8}
                    id="username"
                    label="Username"
                    placeholder="Username"
                    onChange={(e) => setAddUser({...addUser, username : e.target.value})}
                />
                </Grid>
                <Grid item xs={6}>
                <TextInput
                    labelWidth={4}
                    inputWidth={8}
                    id="email"
                    label="Email"
                    placeholder="Email"
                    onChange={(e) => setAddUser({...addUser, email : e.target.value})}
                />
                </Grid>
                <Grid item xs={6}>
                <TextInput
                    labelWidth={4}
                    inputWidth={8}
                    id="password"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    onChange={(e) => setAddUser({...addUser, password : e.target.value})}
                />
                </Grid>
                <Grid item xs={6}>
                <TextInput
                    labelWidth={4}
                    id="phoneNumber"
                    inputWidth={8}
                    label="Phone Number"
                    placeholder="Phone Number"
                    onChange={(e) => setAddUser({...addUser, phoneNumber : parseInt(e.target.value)})}
                />
                </Grid>
                {addUser.role_id === 3 &&
                <Grid item xs={6}>
                    <GridLabelSelect
                        labelWidth={4}
                        fieldWidth={8}
                        label="Kelas"
                        value={addUser.id_kelas}
                        onChange={(e) => setAddUser({...addUser, id_kelas : e.target.value})}
                    >
                        {dataKelas.map(res => {
                            return <MenuItem value={res.id}>{res.namaKelas}</MenuItem>
                        })}
                    </GridLabelSelect>
                </Grid>}
            </Grid>
        </FormModal>
    )
}