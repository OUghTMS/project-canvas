import React, { PureComponent } from "react";

import Cell from './Cell';

import { COMMANDS } from '../facilities/constants';

export default class Canvas extends PureComponent {
    state = {
        canvas: [],
    };

    componentDidMount() {
        const { width, height } = this.props.canvasDimension;
        const rules = this.props.rules;

        let canvas = new Array(height);
        for (let i = 0; i < canvas.length; i++) {
          canvas[i] = new Array(width);

          for (let j = 0; j < width; j++) {
            canvas[i][j] = ' ';
          }
        }

        for (let i = 0; i < rules.length; i++) {
      
            const [ command, ...drawArguments ] = rules[i];
            
            if (command === COMMANDS.LINE) {
                this.drawLine(canvas, ...drawArguments);

            } else if (command === COMMANDS.RECTANGLE) {
                this.drawRectangle(canvas, ...drawArguments);

            } else if (command === COMMANDS.BUCKET_FILL) {
                this.bucketFill(canvas, ...drawArguments);
            }
        }

        this.setState({ canvas: canvas})
    }

    drawLine = (canvas, x, y, x1, y1) => {
        x = Number.parseInt(x) - 1;
        y = Number.parseInt(y) - 1;
        x1 = Number.parseInt(x1) - 1;
        y1 = Number.parseInt(y1) - 1;
    
        if (x === x1) {
            let firstPoint = Math.min(y, y1);
            const secondPoint = Math.max(y, y1);
            for (; firstPoint <= secondPoint; firstPoint++) {
                canvas[firstPoint][x] = 'x';
            }
        } else {
          let firstPoint = Math.min(x, x1);
          const secondPoint =Math.max(x, x1);
          for (; firstPoint <= secondPoint; firstPoint++) {
            canvas[y][firstPoint] = 'x';
          }
        }
    }

    drawRectangle = (canvas, x, y, x1, y2) => {

    }

    bucketFill = (canvas, x, y, color) => {

    }

    render() {
        const canvas = this.state.canvas.map( (row, rowIndex) => <div key={rowIndex}>
            {row.map( (cell, cellIndex) => <Cell key={`${rowIndex}-${cellIndex}`} cell={cell}/>)}
        </div> ) 
    return (
        <div className="canvas">
            {canvas}
        </div>
    );
    } 
}