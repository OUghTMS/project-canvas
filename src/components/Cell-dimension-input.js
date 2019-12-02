import React from "react";

export default function CellDimensionInput(props) {

    return (
        <>
            <label className="dimension-label">Cell dimension:</label>
            <input type="number" value={props.cellDimension} onChange={props.changeCellDimension} className="dimension-input"></input>
        </>
    );
}