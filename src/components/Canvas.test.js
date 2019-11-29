import { drawLine, drawRectangle, bucketFill } from './Canvas.js';

test ('drawLine test', () => {
    let emptyCanvas = [
        [' ', ' ', ' '], 
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '], 
        [' ', ' ', ' ']];
    
    const canvasLine = [
        [' ', ' ', ' '], 
        ['x', 'x', 'x'],
        [' ', ' ', ' '],
        [' ', ' ', ' '], 
        [' ', ' ', ' ']];

    drawLine(emptyCanvas, 0, 1, 2, 1);

    expect(emptyCanvas).toMatchObject(canvasLine);

});

test ('drawRectangle test', () => {
    let emptyCanvas = [
        [' ', ' ', ' '], 
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '], 
        [' ', ' ', ' ']];
    
    const canvasLine = [
        ['x', 'x', ' '], 
        ['x', 'x', ' '],
        ['x', 'x', ' '],
        ['x', 'x', ' '], 
        [' ', ' ', ' ']];

    drawRectangle(emptyCanvas, 0, 0, 1, 3);

    expect(emptyCanvas).toMatchObject(canvasLine);

});

test ('bucketFill test', () => {
    let emptyCanvas = [
        [' ', 'x', ' '], 
        ['x', 'x', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '], 
        [' ', ' ', ' ']];
    
    const canvasLine = [
        [' ', 'x', 'red'], 
        ['x', 'x', 'red'],
        ['red', 'red', 'red'],
        ['red', 'red', 'red'], 
        ['red', 'red', 'red']];

    bucketFill(emptyCanvas, 2, 2, "red");

    expect(emptyCanvas).toMatchObject(canvasLine);

});