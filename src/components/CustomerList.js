import React, {useRef,useState,useEffect} from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';

import Snackbar from '@material-ui/core/Snackbar';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';


import DeleteIcon from '@material-ui/icons/Delete';



function CustomerList(){
    const [customer,setCustomer] = useState([]);
 
    const gridRef = useRef();
    const [open,setOpen] = useState(false);
    const [msg,setMsg] = useState("");


    useEffect(() => getCustomer(), []);

    const getCustomer = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(res => res.json())
        .then(data => setCustomer(data.content))
        .catch(err => console.log(err))
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(newCustomer)
        })
        .then(_ => getCustomer())
        .then(_ =>{
            setMsg('Customer added successfully')
            setOpen(true)
        })

        .catch(err => console.log(err))
    }

    const updateCustomer = (link,person) => {
        fetch(link, {
            method: 'PUT',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(person)
        })
    
        .then(_ =>getCustomer())
        .then(_ => {
            setMsg('Updated customer successfully');
            setOpen(true);
        })

        .catch(err => console.log(err))
    }

    const deleteCustomer = (link) => {
        if(window.confirm('Are you sure?')) 
        {
            fetch(link, {
                method: 'DELETE'

            })
            .then(_ => getCustomer())
            .then(_ => {
                setMsg('Deleted successfully')
                setOpen(true);
            } )
            .catch(err => console.log(err))
        }
    }

    const handleClose = () => {
        setOpen(false)
    }


    const columns = [
        {headerName: 'First Name',width:200, field:'firstname', sortable: true, filter: true },
        {headerName: 'Last Name', field:'lastname', sortable: true, filter: true },
        {headerName: 'Email', field:'email', sortable: true, filter: true },
        {headerName: 'Phone', field:'phone', sortable: true, filter: true },
        {headerName: 'Address', field:'streetaddress', sortable: true, filter: true },
        {headerName: 'Post Code', field:'postcode', sortable: true, filter: true },
        {headerName: 'City', field:'city', sortable: true, filter: true },
        
        {
            headerName: 'Edit',
            width: 50,
             field:'',
             cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params = {params} ></EditCustomer>,
             sortable: true, 
             filter: true },

        {
                headerName: 'Delete',
                width: 50,
                 field:'',
                 cellRendererFramework: params => <DeleteIcon
                                                    size = 'small'
                                                    onClick = {() => deleteCustomer (params.data.links[0].href) }
                                                    ></DeleteIcon>,
                 sortable: true, 
                 filter: true },
                

        
    ]

return (
    <div>
        <div className="ag-theme-material" style={ { height: '650px', width: '90%', margin: 'auto' } }>
            <AgGridReact
            rowData = {customer}
            columnDefs = {columns}
            onGridReady = {params => {
                    gridRef.current = params.api
                    params.api.sizeColumnsToFit();
            }}
            >
            </AgGridReact>
            <AddCustomer addCustomer={addCustomer}  />
        </div>
        <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={msg}
        >
        </Snackbar>
    </div>
)
}

export default CustomerList;