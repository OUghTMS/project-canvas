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

test ('drawLine test1', () => {
    let emptyCanvas = [
        [' ', ' ', ' '], 
        ['x', 'x', 'x'],
        [' ', ' ', ' '],
        [' ', ' ', ' '], 
        [' ', ' ', ' ']];
    
    const canvasLine = [
        [' ', 'x', ' '], 
        ['x', 'x', 'x'],
        [' ', 'x', ' '],
        [' ', 'x', ' '], 
        [' ', 'x', ' ']];

    drawLine(emptyCanvas, 1, 0, 1, 4);

    expect(emptyCanvas).toMatchObject(canvasLine);

});

test ('drawLine test2', () => {
    let emptyCanvas = [
        [' ', ' ', ' '], 
        [' ', 'blue', 'blue'],
        [' ', ' ', ' '],
        [' ', ' ', ' '], 
        [' ', ' ', ' ']];
    
    const canvasLine = [
        [' ', ' ', ' '], 
        [' ', 'blue', 'x'],
        [' ', ' ', 'x'],
        [' ', ' ', ' '], 
        [' ', ' ', ' ']];

    drawLine(emptyCanvas, 2, 1, 2, 2);

    expect(emptyCanvas).toMatchObject(canvasLine);

});

test ('drawRectangle test', () => {
    let emptyCanvas = [
        [' ', ' ', ' '], 
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '], 
        [' ', ' ', ' ']];
    
    const canvasRectangle = [
        ['x', 'x', ' '], 
        ['x', 'x', ' '],
        ['x', 'x', ' '],
        ['x', 'x', ' '], 
        [' ', ' ', ' ']];

    drawRectangle(emptyCanvas, 0, 0, 1, 3);

    expect(emptyCanvas).toMatchObject(canvasRectangle);

});

test ('drawRectangle test1', () => {
    let emptyCanvas = [
        [' ', 'x', ' ', ' '], 
        [' ', 'x', ' ', ' '],
        [' ', ' ', 'x', ' '],
        [' ', ' ', 'x', ' '], 
        [' ', ' ', 'x', ' ']];
    
    const canvasRectangle = [
        [' ', 'x', ' ', ' '], 
        [' ', 'x', 'x', ' '],
        [' ', 'x', 'x', ' '],
        [' ', ' ', 'x', ' '], 
        [' ', ' ', 'x', ' ']];

    drawRectangle(emptyCanvas, 1, 1, 2, 2);

    expect(emptyCanvas).toMatchObject(canvasRectangle);

});

test ('drawRectangle test2', () => {
    let emptyCanvas = [
        [' ', 'blue', 'blue', ' '], 
        ['red', ' ', ' ', 'csdv'],
        ['red', ' ', ' ', 'sdvds'],
        [' ', ' ', ' ', ' '], 
        [' ', 'green', ' green', ' ']];
    
    const canvasRectangle = [
        ['x', 'x', 'x', 'x'], 
        ['x', ' ', ' ', 'x'],
        ['x', ' ', ' ', 'x'],
        ['x', ' ', ' ', 'x'], 
        ['x', 'x', 'x', 'x']];

    drawRectangle(emptyCanvas, 0, 0, 3, 4);

    expect(emptyCanvas).toMatchObject(canvasRectangle);

});

test ('bucketFill test', () => {
    let emptyCanvas = [
        [' ', 'x', ' '], 
        ['x', 'x', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '], 
        [' ', ' ', ' ']];
    
    const canvasBucketFill = [
        [' ', 'x', 'red'], 
        ['x', 'x', 'red'],
        ['red', 'red', 'red'],
        ['red', 'red', 'red'], 
        ['red', 'red', 'red']];

    bucketFill(emptyCanvas, 2, 2, "red");

    expect(emptyCanvas).toMatchObject(canvasBucketFill);

});

test ('bucketFill test1', () => {
    let emptyCanvas = [
        [' ', 'x', 'o'], 
        ['x', 'x', ' '],
        [' ', 'x', 'x'],
        [' ', 'o', ' '], 
        [' ', ' ', ' ']];
    
    const canvasBucketFill = [
        [' ', 'green', 'o'], 
        ['green', 'green', ' '],
        [' ', 'green', 'green'],
        [' ', 'o', ' '], 
        [' ', ' ', ' ']];

    bucketFill(emptyCanvas, 2, 2, "green");

    expect(emptyCanvas).toMatchObject(canvasBucketFill);

});

test ('bucketFill test2', () => {
    let emptyCanvas = [
        ['o', 'o', 'o'], 
        ['o', 'x', 'o'],
        ['o', 'o', 'o'],
        [' ', ' ', ' '], 
        [' ', ' ', ' ']];
    
    const canvasBucketFill = [
        ['o', 'o', 'o'], 
        ['o', 'rgb(0,0,0)', 'o'],
        ['o', 'o', 'o'],
        [' ', ' ', ' '], 
        [' ', ' ', ' ']];

    bucketFill(emptyCanvas, 1, 1, "rgb(0,0,0)");

    expect(emptyCanvas).toMatchObject(canvasBucketFill);

});