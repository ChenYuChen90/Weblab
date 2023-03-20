import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Pages from './pages/Pages';

import Paper from '@mui/material/Paper';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Paper elevation={10}>
        <Pages />
    </Paper>
);
