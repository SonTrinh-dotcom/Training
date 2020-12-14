import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
function AddCustomer(props) {

    const [open,setOpen] = useState(false);
    const [person,setPerson] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone:'',
        streetaddress:'',
        postcode:'',
        city:'',
        
    });

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const inputChanged = (e) => {
        setPerson({...person, [e.target.name]: e.target.value})
    }

    const handleSave = () => {
        props.addCustomer(person);
        handleClose();
    }

    return (
        <div>
            <Button color = "primary" onClick = {handleClickOpen} variant="outlined">Add customer</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title">Add customer</DialogTitle>
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
                    label="Street Address"
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
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleSave} color="primary" >Save</Button>
            </DialogActions>
            
            </Dialog>
        </div>
    )
}

export default AddCustomer;