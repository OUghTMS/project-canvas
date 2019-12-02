import React, { Component } from "react";

import './App.css';

import FileLoadingButton from './components/File-loading-button';
import ErrorMessages from './components/Error-messages';
import Canvas from './components/Canvas'
import CellDimensionInput from './components/Cell-dimension-input'

import { isValid, VALID } from './facilities/validation';
import { COMMANDS, ERRORS } from './facilities/constants';

export default class App extends Component {
  state = {
    drawingRules: [],
    errors: [],
    cellDimension: 15,
    canvasDimension: {
      width: null,
      height: null,
    },
  };

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
        },
        drawingRules: [] });
      }
    }

    if (errors.length === 0) {
      drawRules.forEach( (rule, index)  => {
        const drawingArguments = rule.trim().split(' ');
        
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
      this.setState({ drawingRules: drawRules.map( ruleArguments => ruleArguments.split(' ') ), errors: [] });
    } else {
      this.setState({ errors: errors, drawingRules: [] });
    }
  }
  
  changeCellDimension = (event) => {

    if (event.target.value < 1) {
      
      this.setState({ cellDimension: 1 });
    } else if(event.target.value > 50) {
      
      this.setState({ cellDimension: 50 });
    } else {

      this.setState({ cellDimension: Number.parseInt(event.target.value) });
    }
  }

  render() {
    const { drawingRules, canvasDimension, errors, cellDimension } = this.state;
    const canvas = drawingRules.length ? <Canvas rules={drawingRules} canvasDimension={canvasDimension} cellDimension={cellDimension}/> : <ErrorMessages errors={errors} />;
    const cellDimensionInput = Boolean(drawingRules.length) && <CellDimensionInput cellDimension={cellDimension} changeCellDimension={this.changeCellDimension} />;
    return (
      <div className="container">
        <div className="input-container">
          <FileLoadingButton checkData={this.checkData} />
          {cellDimensionInput}
        </div>
        {canvas}
      </div>
    );
  } 
}