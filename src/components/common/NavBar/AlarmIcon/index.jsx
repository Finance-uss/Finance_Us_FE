import React from "react";
import { Link } from "react-router-dom";

const AlarmIcon = ({ icon }) => {
    return (
        <Link to="/alarm">
            <img src={icon} alt="Alarm Icon" />
        </Link>
    );
};

export default AlarmIcon;