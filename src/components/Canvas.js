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

        rules.forEach( rule => {
            const [ command, ...drawArguments ] = rule;
            
            if (command === COMMANDS.LINE) {
                const x = Number.parseInt(drawArguments[0]) - 1;
                const y = Number.parseInt(drawArguments[1]) - 1;
                const x1 = Number.parseInt(drawArguments[2]) - 1;
                const y1 = Number.parseInt(drawArguments[3]) - 1;

                this.drawLine(canvas, x, y, x1, y1);

            } else if (command === COMMANDS.RECTANGLE) {
                const x = Number.parseInt(drawArguments[0]) - 1;
                const y = Number.parseInt(drawArguments[1]) - 1;
                const x1 = Number.parseInt(drawArguments[2]) - 1;
                const y1 = Number.parseInt(drawArguments[3]) - 1;

                this.drawRectangle(canvas, x, y, x1, y1);

            } else if (command === COMMANDS.BUCKET_FILL) {
                const x = Number.parseInt(drawArguments[0]) - 1;
                const y = Number.parseInt(drawArguments[1]) - 1;

                this.bucketFill(canvas, x, y, drawArguments[2]);
            }
        })

        this.setState({ canvas: canvas})
    }

    drawLine = (canvas, x, y, x1, y1) => {
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

    drawRectangle = (canvas, x, y, x1, y1) => {
        
        this.drawLine(canvas, x, y, x1, y);
        this.drawLine(canvas, x, y, x, y1);
        this.drawLine(canvas, x1, y, x1, y1);
        this.drawLine(canvas, x, y1, x1, y1);
    }

    bucketFill = (canvas, x, y, color) => {
        const initialColor = canvas[y][x];
        canvas[y][x] = color;

        if (y > 0) {

            if (canvas[y-1][x] === initialColor) {
    
                this.bucketFill(canvas, x, y-1, color);
            }   
        }

        if (y < canvas.length - 1) {

            if (canvas[y+1][x] === initialColor) {
    
                this.bucketFill(canvas, x, y+1, color);
            }   
        }

        if (x > 0) {

            if (canvas[y][x-1] === initialColor) {
    
                this.bucketFill(canvas, x-1, y, color);
            }        
        }

        if (x < canvas[0].length - 1) {

            if (canvas[y][x+1] === initialColor) {
    
                this.bucketFill(canvas, x+1, y, color);
            }
        }
    }

    render() {
        const canvas = this.state.canvas.map( (row, rowIndex) => <div key={rowIndex} className="row">
            {row.map( (cell, cellIndex) => <Cell key={`${rowIndex}-${cellIndex}`} cell={cell}/>)}
        </div> ) 
    return (
        <div className="canvas">
            {canvas}
        </div>
    );
    } 
}