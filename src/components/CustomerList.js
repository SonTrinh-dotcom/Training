import React, {useRef,useState,useEffect} from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';

import Snackbar from '@material-ui/core/Snackbar';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';


import DeleteIcon from '@material-ui/icons/Delete';



function CustomerList(){

    const BASE_URL = 'https://customerrest.herokuapp.com/api';

    const [customer,setCustomer] = useState([]);
 
    const gridRef = useRef();
    const [open,setOpen] = useState(false);
    const [msg,setMsg] = useState("");

    const fetchPromise = async(url) => {
        const res = await fetch(url);
        return await res.json();
    }

    useEffect(() => main(), []);

    const main = async () => {
        try {
            const {content} = await fetchPromise (`${BASE_URL}/customers`);
            const customers = content 
            const promises = customers.map(async({links}, index) => {
                const {href} = links.find(({rel}) => rel ==='trainings');
                const customerUrl = href
                const training = await fetchPromise(customerUrl);
                customers[index].training = training;
                
            });

            await Promise.all(promises);
            setCustomer(customers)
     

        }
        catch(e) {
            console.error("wtf",e)
        }
    }
    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(newCustomer)
        })
        .then(_ => main())
        .then(_ =>{
            setMsg('Customer added successfully')
            setOpen(true)
        })

        .catch(err => console.log(err))
    }

    /* const addTraining = (newTraining,newDate) => {
        fetch(data.training.content,{
            method:'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(newTraining,newDate)
        })
        .then(_ => main())
        .then(_ =>{
            setMsg('Training added succesfully')
            setOpen(true)
        })
        .catch(err => console.log(err))
    } */

    const updateCustomer = (link,person) => {
        fetch(link, {
            method: 'PUT',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(person)
        })
    
        .then(_ =>main())
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
            .then(_ => main())
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
        {headerName: 'First Name',width:50, field:'firstname', sortable: true, filter: true },
        {headerName: 'Last Name',width:50, field:'lastname', sortable: true, filter: true },
        {headerName: 'Email', field:'email',width:80, sortable: true, filter: true },
        {headerName: 'Phone',width:80, field:'phone', sortable: true, filter: true },
        {headerName: 'Address',width:80, field:'streetaddress', sortable: true, filter: true },
        {headerName: 'Post Code',width:40, field:'postcode', sortable: true, filter: true },
        {headerName: 'City',width:40, field:'city', sortable: true, filter: true },
        
        {
            headerName: '',
            width: 5,
             field:'',
             cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params = {params} main={main()} ></EditCustomer>,
             sortable: true, 
             filter: true },

        {
                headerName: '',
                width: 5,
                 field:'',
                 cellRendererFramework: params => <DeleteIcon
                                                    size = 'small'
                                                    onClick = {() => deleteCustomer (params.data.links[0].href) }
                                                    ></DeleteIcon>,
                 sortable: true, 
                 filter: true },
        
                 {
                    headerName: '',
                    width: 5,
                     field:'',
                     cellRendererFramework: params => <AddTraining  params = {params}  ></AddTraining>,
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