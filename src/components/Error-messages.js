import React from "react";

export default function ErrorMessages(props) {
    const errorsList = props.errors.map(error => <div className="error" key={`${error.id}${error.rule}`}>
        Error on line {error.rule}: {error.meta}
    </div>)
    return (
        <div className="errors-list">
            {errorsList}
        </div>
    );
}