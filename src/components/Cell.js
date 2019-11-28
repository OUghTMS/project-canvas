import React from "react";

export default function Cell(props) {
    
    const styleClass = () => {
        const cell = 'cell';

        if (props.cell === 'x') {
          
            return `${cell} blueviolet-cell`
        } else if (props.cell === 'o') {
            
            return  `${cell} green-cell`
        } else {

            return cell;
        }
    } 
    return (
        <div className={styleClass()}>
        </div>
    );
}