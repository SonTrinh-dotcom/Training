import React, {useRef,useState,useEffect} from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import DeleteIcon from '@material-ui/icons/Delete';

import { AgGridReact } from 'ag-grid-react/lib/agGridReact';

import Snackbar from '@material-ui/core/Snackbar';

import moment from 'moment'

const Training = () => {

    const [training, setTraining] = useState([]);
    const [customer,setCustomer] = useState([]);
    const gridRef = useRef();
    const [open,setOpen] = useState(false);
    const  [msg,setMsg] = useState("");

    useEffect(() => main(), []);

    const BASE_URL = 'https://customerrest.herokuapp.com/api';

    const fetchPromise = async(url) => {
        const res = await fetch(url);
        return await res.json();
    }

    const main = async () => {
        try {
            const {content} = await fetchPromise (`${BASE_URL}/trainings`);
            const trainings = content 
            const promises = trainings.map(async({links}, index) => {
                const {href} = links.find(({rel}) => rel ==='customer');
                const customerUrl = href
                const customer = await fetchPromise(customerUrl);
                trainings[index].customer = customer;
                
            });

            await Promise.all(promises);
            setTraining(trainings)
           console.log(trainings)

        }
        catch(e) {
            console.error("wtf",e)
        }
    }

    /* const getTraining = () => {
        fetch ('https://customerrest.herokuapp.com/api/trainings')
        .then(res => res.json())
        
        .then((data) => {
            setTraining(data.content);
            console.log(data.content.links[2].href)
            })
            
        .catch(err => console.log(err))
    }
 */
    const deleteAction = (link) => {
        if(window.confirm('Are you sure?'))
        {
            fetch(link, {
            method: 'DELETE'
            })
            .then(_ => main())
            .then(_ =>{ 
                setMsg('Deleted successfully')
                setOpen(true)
            })
            .catch(err => console.err("WTF"))

        }
    }

    const handleClose = () => {
        setOpen(false);
    }

/*     const getCustomer = (link) => {
        return fetch(link)
        .then(res => res.json())

        .then((dataCustomer) => 
            setCustomer(dataCustomer.firstname)
        )
        .catch(err => console.log(err))
    }
 */
   
    
    const columns = [
       
            
        {headerName: 'Activity',width:100, field:'activity', sortable: true, filter: true },
        {headerName: 'Date',width:100, field:'date', sortable: true, filter: true },
        {headerName: 'Duration(min)',width:50, field:'duration', sortable: true, filter: true },
        {
            headerName: 'Customer',
            width: 10,
             field:'',
             cellRendererFramework: params => <div>{params.data.customer.firstname}</div>,
             sortable: true, 
             filter: true ,
          
        },
        {
            headerName: 'Delete',
            width: 50,
             field:'',
             cellRendererFramework: params => <DeleteIcon
                                                size = 'small'
                                                onClick = {() => deleteAction (params.data.links[0].href) }
                                                ></DeleteIcon>,
             sortable: true, 
             filter: true },

    ]

    return (
        <div>
           <div className = "ag-theme-material" style={ { height: '650px', width: '90%', margin: 'auto' } }>
           <AgGridReact
           rowData = {training}
           columnDefs = {columns}
           onGridReady = {params => {
                   gridRef.current = params.api
                   params.api.sizeColumnsToFit();
           }}
           >
           </AgGridReact>
           
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

export default Training;