import React, { Component } from "react";

import './App.css';

import FileLoadingButton from './components/File-loading-button';
import Button from './components/Button';
import ErrorMessages from './components/Error-messages';

import { isValid, VALID } from './facilities/validation';
import { COMMANDS, ERRORS } from './facilities/constants';

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
    const { width, height } = this.state.canvasDimension;

    let newCanvas = new Array(height);
    for (let i = 0; i < newCanvas.length; i++) {
      newCanvas[i] = new Array(width);
    }

    this.setState({ canvas: newCanvas });
    
    for (let i = 1; i < drawingRules.length; i++) {
      
      const [ command, ...drawArguments ] = drawingRules[i];
      
      if (command === COMMANDS.LINE) {
        this.drawLine(...drawArguments);
      } else if (command === COMMANDS.RECTANGLE) {
        this.drawRectangle(...drawArguments);
      } else if (command === COMMANDS.BUCKET_FILL) {
        this.bucketFill(...drawArguments);
      }
    }
  }

  drawLine = (x, y, x1, y2) => {

  }

  drawRectangle = (x, y, x1, y2) => {

  }

  bucketFill = (x, y, color) => {

  }

  checkData = (dataFromFile) => {
    let errors = [];
    const arrayOfStrings = dataFromFile.split('\n');
    const [canvasRule, ...drawRules] = arrayOfStrings;
    const canvasArguments = canvasRule.split(' ');

    if (canvasArguments[0] !== COMMANDS.CANVAS) {

      errors = [...errors, {
        id: ERRORS.noCanvasFound,
        rule: 1,
        meta: `${canvasArguments[0]} shoulde be equal to ${COMMANDS.CANVAS}`
      }];

    } else {
      const { valid, width, height } = isValid(canvasArguments);
      if (valid === VALID) {
        this.setState({ canvasDimension: {
          width: width, 
          height: height
        } });
      }
    }

    if (errors.length === 0) {
      drawRules.forEach( (string, index)  => {
        const drawingArguments = string.split(' ');
        
        if (drawingArguments[0] === COMMANDS.CANVAS) {
          errors = [...errors, {
            id: ERRORS.invalidFunction, 
            rule: index+2,
            meta: 'canvas is already initialized'
          }];
        } else {
          const { width, height } = this.state.canvasDimension;
          const validationMessage = isValid(drawingArguments, width, height);
        
          if (validationMessage !== VALID) {
            errors = [...errors, {...validationMessage, rule: index+2}];
          }          
        }
      });
    }

    if (errors.length === 0) {
      this.setState({ drawingRules: drawRules.map( ruleArguments => ruleArguments.split(' ') ) });
    } else {
      this.setState({ errors: errors });
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
        <ErrorMessages errors={this.state.errors} />
      </>
    );
  } 
}