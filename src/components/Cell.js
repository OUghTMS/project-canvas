import React from "react";

export default function Cell(props) {

    const cellBackground = () => {

        const s = new Option().style;
        s.color = props.cell;
        
        if (props.cell === ' ') {
            return '#ffffff';
        }

        if ( s.color !== '' ) {

            return props.cell;
        }

        const colors = props.cell.split('').map((char) => '00'.concat(char.charCodeAt(0).toString(2)).slice(-6));
        const colorsRGB = colors.map( color => color.match(/.{1,2}/g) );

        let RGB = Array(3);
        for(let i = 0; i < 3; i++){

            RGB[i] = colorsRGB.reduce( (acc, value) => acc + parseInt(value[i], 2), 0 );
        }
        const maxRGB = Math.max(...RGB);
        RGB = RGB.map( color => color/maxRGB * 255 );

        return `rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`;
    }

    return (
        <div className="cell" style={{ background: cellBackground(), width: props.dimension, height: props.dimension }}>
        </div>
    );
}