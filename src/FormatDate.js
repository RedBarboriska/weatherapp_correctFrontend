import React from 'react';

function formatDate(dateStr) {
    const months = [
        'січня',
        'лютого',
        'березня',
        'квітня',
        'травня',
        'червня',
        'липня',
        'серпня',
        'вересня',
        'жовтня',
        'листопада',
        'грудня',
    ];

    const date = new Date(dateStr);
    const day = date.getDate();
    const monthName = months[date.getMonth()];

    return `${day} ${monthName}`;
}


export default formatDate;
