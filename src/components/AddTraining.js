import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const AddTraining = (props) => {
    const [training, setTraining] = useState({
        activity: '',
        duration: '',
        date: '',
    });

    const addTraining = (training,date) => {
        fetch(props.params.data.training.content,{
            method:'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(training,selectedDate)
        })
       .then(_ => props.main )
        .then(_ =>{
            setOpen(true)
        })
        .catch(err => console.log(err))
    }

    const [open,setOpen] = useState(false);

    const handleOpen = () => {
      
        setOpen(true)
        setTraining({
            firstname: ''
        })
    }
    const handleClose= () => {
        setOpen(false)
    }

    const inputChanged = (e) => {
        setTraining({...training,[e.target.name]:e.target.value})
    }

   const handleSave = () => {
       
      addTraining(training,selectedDate)
       setOpen(false)
   }
  
   

  
   const [selectedDate,setSelectedDate] = useState(new Date('2020-12-18T21:11:54'));

   const handleChanged = (date) => {
    setSelectedDate(date)
    }

   /*  console.log(selectedDate) */

  
  

    return (
        <div>
        <Button color="primary" size="small" onClick={handleOpen} variant="contained" >Add training</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title">
            Add training ({props.params.data.firstname} {props.params.data.lastname})
            </DialogTitle>
            <DialogContent>
                    <TextField
                        autoFocus={true}
                        name='activity'
                        value={training.activity}
                        margin='dense'
                        label="Activity"
                        onChange={inputChanged}
                        fullWidth
                        />
                    <TextField
                        autoFocus={true}
                        name='duration'
                        value={training.duration}
                        margin='dense'
                        label="Duration(min)"
                        onChange={inputChanged}
                        fullWidth
                        />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                         <Grid container justify="space-around">
        
                            <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleChanged}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                            <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            value={selectedDate}
                            onChange={handleChanged}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            />

                         </Grid>

                   </MuiPickersUtilsProvider>
                
             </DialogContent>

            <DialogActions>

                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>

            </DialogActions>

        </Dialog>
        
        </div>
    )
}

export default AddTraining;