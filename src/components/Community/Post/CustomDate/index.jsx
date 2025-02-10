import React from 'react';

const CustomDate = () => {

const today = new Date();

const formattedDate = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()} `;
const formattedTime = `${today.getHours()}:${today.getMinutes().toString().padStart(2, '0')}`; 

    return (
        <div>
            {formattedDate}{formattedTime}
        </div>
    );
}

export default CustomDate;