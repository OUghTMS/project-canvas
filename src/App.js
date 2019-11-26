import React, { Component } from "react";

import './App.css';

import FileLoadingButton from './components/File-loading-button';
import Button from './components/Button';

const COMMANDS = { CANVAS: 'C', LINE: 'L', RECTANGLE: 'R', BUCKET_FILL: 'B' };
const ERRORS = { 
  actionInNonExistentCanvas:'attempt to perform an action in a non-existent canvas',
  invalidNumberOfArguments: 'invalid number of arguments',
  invalidArguments: 'invalid arguments',
  invalidFunction: 'invalid function'
  };

export default class App extends Component {
  state = {
    drawingRules: [],
    errors: [],
    canvas: [],
    canvasDimension: {
      width: null,
      height: null,
    },
  };

  drawCanvas = () => {
    const { drawingRules } = this.state;
    const { canvasWidth, canvasHeight } = this.state.canvasDimension;

    let newCanvas = new Array(canvasHeight);
    for (let i = 0; i < newCanvas.length; i++) {
      newCanvas[i] = new Array(canvasWidth);
    }

    for (let i = 1; i < drawingRules.length; i++) {
      
      const [ command, ...drawArguments ] = drawingRules;
      
      if (command === COMMANDS.LINE) {
        this.drawLine(...drawArguments);
      } else if (command === COMMANDS.RECTANGLE) {
        this.drawRectangle(...drawArguments);
      } else if (command === COMMANDS.BUCKET_FILL) {
        this.bucketFill(...drawArguments);
      }
    }

    this.setState({ canvas: newCanvas });
  }

  drawLine = (x, y, x1, y2) => {

  }

  drawRectangle = (x, y, x1, y2) => {

  }

  bucketFill = (x, y, color) => {
    
  }

  checkData = (dataFromFile) => {
    this.setState({ errors: [], drawingRules: [] });

    const arrayOfStrings = dataFromFile.split('\n');

    const [canvasRule, ...drawRules] = arrayOfStrings;
        
    const canvasArguments = canvasRule.split(' ');
    if (canvasArguments[0] !== COMMANDS.CANVAS) {

      const newError = {
        id: ERRORS.actionInNonExistentCanvas,
        rule: 1,
        meta: `${canvasArguments[0]} shoulde be equal to ${COMMANDS.CANVAS}`
      };
      this.setState({ errors: [ ...this.state.errors, newError] });

    } else if (canvasArguments.length !== 3) {
      
      const newError = {
        id: ERRORS.invalidNumberOfArguments,
        rule: 1,
        meta: `${canvasArguments[0]} should have 2 arguments`
      };
      this.setState({ errors: [ ...this.state.errors, newError] });
    
    } else if (
      isNaN(Number.parseInt(canvasArguments[1])) || 
      isNaN(Number.parseInt(canvasArguments[2])) ||
      Number.parseInt(canvasArguments[1]) < 1 ||
      Number.parseInt(canvasArguments[2]) < 1 ) {
      
        const newError = {
          id: ERRORS.invalidArguments,
          rule: 1,
          meta: `${canvasArguments[0]} arguments should have format [number number] (number > 0)`
        };
        this.setState({ errors: [ ...this.state.errors, newError] });
    
    } else {

      this.setState({ canvasDimension: {
        width: Number.parseInt(canvasArguments[1]),
        height: Number.parseInt(canvasArguments[2]),
      }});
    }

    drawRules.forEach( (string, index)  => {
      const drawingArguments = string.split(' ');
      
      const { width, height } = this.state.canvasDimension;

      if (drawingArguments[0] === COMMANDS.LINE || drawingArguments[0] === COMMANDS.RECTANGLE) {
        
        if (drawingArguments.length !== 5) {

          const newError = {
            id: ERRORS.invalidNumberOfArguments,
            rule: index + 2,
            meta: `${drawingArguments[0]} should have 4 arguments`
          };
          this.setState({ errors: [ ...this.state.errors, newError] });
          
        } else if (            
          isNaN(Number.parseInt(drawingArguments[1])) || 
          isNaN(Number.parseInt(drawingArguments[2])) ||
          isNaN(Number.parseInt(drawingArguments[3])) || 
          isNaN(Number.parseInt(drawingArguments[4])) ||
          
          Number.parseInt(drawingArguments[1]) < 1 ||
          Number.parseInt(drawingArguments[2]) < 1 ||
          Number.parseInt(drawingArguments[3]) < 1 ||
          Number.parseInt(drawingArguments[4]) < 1 ||

          Number.parseInt(drawingArguments[1]) > width  ||
          Number.parseInt(drawingArguments[2]) > height ||
          Number.parseInt(drawingArguments[3]) > width  ||
          Number.parseInt(drawingArguments[4]) > height ) {
          
            const newError = {
              id: ERRORS.invalidArguments,
              rule: index + 2,
              meta: `${drawingArguments[0]} arguments should have format [x y x1 y1] (x, y, x1, y1 = number; 0 < x, x1 < ${width+1}; 0 < y, y1 < ${height+1})`
            };
            this.setState({ errors: [ ...this.state.errors, newError] });
        
          } else if ( 
          drawingArguments[0] === COMMANDS.LINE &&
          drawingArguments[1] !== drawingArguments[3] && 
          drawingArguments[2] !== drawingArguments[4] ) {

            const newError = {
              id: ERRORS.invalidArguments,
              rule: index + 2,
              meta: `${drawingArguments[0]} can not execute for diagonal lines`
            };
            this.setState({ errors: [ ...this.state.errors, newError] });
          }
      
      } else if (drawingArguments[0] === COMMANDS.BUCKET_FILL) {
        
        if (drawingArguments.length !== 4) {
        
          const newError = {
            id: ERRORS.invalidNumberOfArguments,
            rule: index + 2,
            meta: `${drawingArguments[0]} should have 3 arguments`
          };
          this.setState({ errors: [ ...this.state.errors, newError] });
        
        } else if (
          isNaN(Number.parseInt(drawingArguments[1])) || 
          isNaN(Number.parseInt(drawingArguments[2])) ||
          
          Number.parseInt(drawingArguments[1]) < 1 ||
          Number.parseInt(drawingArguments[2]) < 1 ||

          Number.parseInt(drawingArguments[1]) > width  ||
          Number.parseInt(drawingArguments[2]) > height ||
          
          drawingArguments[3].length !== 1 ) {

            const newError = {
              id: ERRORS.invalidArguments,
              rule: index + 2,
              meta: `${drawingArguments[0]} arguments should have format [x y color] (x, y = number; 0 < x < ${width+1}; 0 < y < ${height+1}; color = singl symbol)`
            };
            this.setState({ errors: [ ...this.state.errors, newError] });
        }

      } else {
        
        const newError = {
          id: ERRORS.invalidFunction,
          rule: index + 2,
          meta: `${drawingArguments[0]} function does not exist`
        };
        this.setState({ errors: [ ...this.state.errors, newError] });

      }
    });

    if (this.state.errors.length === 0) {
      this.setState({ drawingRules: drawRules.map( ruleArguments => ruleArguments.split(' ') ) });
    }
  }

  showErrors = () => {
    console.log(this.state.errors);
  }
  
  render() {
    const action = this.state.drawingRules.length ? this.drawCanvas : this.showErrors;
    return (
      <>
        <FileLoadingButton checkData={this.checkData} />
        <Button action={action} name="Create Canvas"/>
      </>
    );
  } 
}