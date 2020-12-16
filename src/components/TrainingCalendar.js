import React, {useState,useEffect} from 'react';
import { Calendar, momentLocalizer} from 'react-big-calendar';
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

    const events = trainings.map((training)=> {
        return {
            id: training.id,
            allDay: 'false',
            activity: training.activity,
            start: training.date,
            end:moment().add(training.duration, 'minutes'),
            
        }
    }
    )

  /*   console.log(events) */

    return (
    <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        views={['month','day','week']}
        style={{height:450}}
    />

    )
}

export default TrainingCalendar;