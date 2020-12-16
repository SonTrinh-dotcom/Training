import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import SettingsIcon from '@material-ui/icons/Settings';

import Button from '@material-ui/core/Button';


function EditCustomer(props) {

    const [open,setOpen] = useState(false); 

    const [person, setPerson] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone:'',
        streetaddress:'',
        postcode:'',
        city:'',
        
    })

    const handleClickOpen = () => {
        console.log(props.params.data.links[0]);
        setPerson({
            firstname: props.params.data.firstname,
            lastname: props.params.data.lastname,
            email: props.params.data.email,
            phone: props.params.data.phone,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
         })
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const inputChanged = (e) => {
        setPerson({...person, [e.target.name]: e.target.value})
    }

    const handleSaved = () => {
        props.updateCustomer(props.params.data.links[0].href,person);
        handleClose();
    }

    return (
        <div>
            <SettingsIcon onClick={handleClickOpen}
                         size="small"
                         
                         />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit customer information</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus={true}
                    name='firstname'
                    value={person.firstname}
                    margin='dense'
                    label="First Name"
                    onChange={inputChanged}
                    fullWidth
                />
                <TextField
                    autoFocus={true}
                    name='lastname'
                    value={person.lastname}
                    margin='dense'
                    label="Last Name"
                    onChange={inputChanged}
                    fullWidth
                />
                <TextField
                    autoFocus={true}
                    name='email'
                    value={person.email}
                    margin='dense'
                    label="Email"
                    onChange={inputChanged}
                    fullWidth
                />
                <TextField
                    autoFocus={true}
                    name='phone'
                    value={person.phone}
                    margin='dense'
                    label="Phone"
                    onChange={inputChanged}
                    fullWidth
                />
                <TextField
                    autoFocus={true}
                    name='streetaddress'
                    value={person.streetaddress}
                    margin='dense'
                    label="Address"
                    onChange={inputChanged}
                    fullWidth
                />
                <TextField
                    autoFocus={true}
                    name='postcode'
                    value={person.postcode}
                    margin='dense'
                    label="Post Code"
                    onChange={inputChanged}
                    fullWidth
                />
                <TextField
                    autoFocus={true}
                    name='city'
                    value={person.city}
                    margin='dense'
                    label="City"
                    onChange={inputChanged}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel
                </Button>
                <Button onClick={handleSaved} color="primary">Save</Button>
            </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditCustomer;