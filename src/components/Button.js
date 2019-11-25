import React from "react";

export default function Button(props) {
    
    const { action, name } = props;
    return (
        <button onClick={action} className="action-button">{name}</button>
    );
}