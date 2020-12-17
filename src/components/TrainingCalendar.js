import React, {useState,useEffect} from 'react';
import { Calendar, momentLocalizer, Views} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const TrainingCalendar = () => {
    const localizer = momentLocalizer(moment)
    const [trainings,setTrainings] = useState([])

    useEffect(() => {getTraining()});

    const getTraining = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(res => res.json())
        .then(data => setTrainings(data))
        .catch(err => console.log(err))
 /*        console.log(trainings) */
    }

    const allViews = Object.keys(Views).map(k=> Views[k]);

    const events = trainings.map((training)=> {
        return {
            id: training.id,
            title: training.activity,
            firstname: training.customer.firstname,
            start: training.date,
            end:moment().add(training.duration, 'minutes'),
            
        }
    }
    )

        return (
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor='start'
            endAccessor='end'
            step='60'
            views={['month','agenda']}
            style={{height:450}}
        />

        )
}

export default TrainingCalendar;