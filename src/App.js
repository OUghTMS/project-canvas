import React, { Component } from "react";

import './App.css';

import FileLoadingButton from './components/File-loading-button';
import Button from './components/Button';

const COMMANDS = { CANVAS: 'C', LINE: 'L', RECTANGLE: 'R', BUCKET_FILL: 'B' };

export default class App extends Component {
  state = {
    drawingRules: [],
    errors: [],
  };

  drawCanvas = () => {

  }

  checkData = (dataFromFile) => {
    this.setState({ errors: [] });

    let arrayOfStrings = dataFromFile.split('\n');
    
    if(arrayOfStrings[0][0] !== COMMANDS.CANVAS) {

      this.setState({ errors: [ ...this.state.errors, -1] });
    }

    arrayOfStrings.forEach(string => {
      const drawingArguments = string.split(' ');
      
      if (drawingArguments[0] === COMMANDS.CANVAS) {
        
        if (drawingArguments.length !== 3) {
          this.setState({ errors: [ ...this.state.errors, -3] });
        } else if (
          isNaN(drawingArguments[1]-0) || 
          isNaN(drawingArguments[2]-0) ||
          drawingArguments[1]-0 < 1 ||
          drawingArguments[2]-0 < 1 ) {

          this.setState({ errors: [ ...this.state.errors, -4] });
        }

      } else if (drawingArguments[0] === COMMANDS.LINE || drawingArguments[0] === COMMANDS.RECTANGLE) {
        
        if (drawingArguments.length !== 5) {

          this.setState({ errors: [ ...this.state.errors, -3] });
          
        } else if (            
          isNaN(drawingArguments[1]-0) || 
          isNaN(drawingArguments[2]-0) ||
          isNaN(drawingArguments[3]-0) || 
          isNaN(drawingArguments[4]-0) ||
          drawingArguments[1]-0 < 1 ||
          drawingArguments[2]-0 < 1 ||
          drawingArguments[3]-0 < 1 ||
          drawingArguments[4]-0 < 1 ) {
          
          this.setState({ errors: [ ...this.state.errors, -4] });
        } else if ( 
          drawingArguments[0] === COMMANDS.LINE &&
          drawingArguments[1] !== drawingArguments[3] && 
          drawingArguments[2] !== drawingArguments[4] ) {

            this.setState({ errors: [ ...this.state.errors, -5] });
          }
      
      } else if (drawingArguments[0] === COMMANDS.BUCKET_FILL) {
        
        if (drawingArguments.length !== 4) {
        
          this.setState({ errors: [ ...this.state.errors, -3] });
        
        } else if (
            isNaN(drawingArguments[1]-0) || 
            isNaN(drawingArguments[2]-0) ||
            drawingArguments[1]-0 < 1 ||
            drawingArguments[2]-0 < 1 ||
            drawingArguments[3].length !== 1) {

          this.setState({ errors: [ ...this.state.errors, -4] });
        }

      } else {
        this.setState({ errors: [ ...this.state.errors, -2] });
      }
    });

    if (this.state.errors.length === 0) {
      this.setState({ drawingRules: arrayOfStrings.map( string => string.split(' ') ) });
    }
  }

  
  render() {
    const action = this.state.drawingRules? this.drawCanvas : this.showErrors;
    return (
      <>
        <FileLoadingButton checkData={this.checkData} />
        <Button action={action} name="Create Canvas"/>
      </>
    );
  } 
}