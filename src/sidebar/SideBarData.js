import React from 'react'
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import EventNoteIcon from '@material-ui/icons/EventNote';

export  const SideBarData = [
    {
        title: 'CustomerList',
        path: '/',
        icon: <PermContactCalendarIcon />,
        cName: 'nav-text'
      },
      {
        title: 'Training',
        path: '/training',
        icon: <LibraryAddIcon />,
        cName: 'nav-text'
      },
      {
        title: 'Calendar',
        path: '/calendar',
        icon: <EventNoteIcon />,
        cName: 'nav-text'
      },
     
];