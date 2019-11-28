import { COMMANDS, ERRORS } from './constants';

export const VALID = 'valid';

export function isValid (actionRules, width, height) {
    const [ command, ...commandArguments ] = actionRules;
    switch(command) {
        case COMMANDS.CANVAS:
            return canvasArgumentsIsValid(commandArguments);

        case COMMANDS.LINE:
            return lineArgumentsIsValid(commandArguments, width, height);  
        
        case COMMANDS.RECTANGLE:
            return rectangleArgumentsIsValid(commandArguments, width, height);

        case COMMANDS.BUCKET_FILL:
            return bucketFillArgumentsIsValid(commandArguments, width, height);

        default:
            return commandDoesNotExist(command);
      }

}

function canvasArgumentsIsValid (commandArguments) {
    if (commandArguments.length !== 2) {

        return {
            id: ERRORS.invalidNumberOfArguments,
            meta: `C should have 2 arguments`
        };

    } else if (
        isNaN(Number.parseInt(commandArguments[0])) || 
        isNaN(Number.parseInt(commandArguments[1])) ||
        Number.parseInt(commandArguments[0]) < 1 ||
        Number.parseInt(commandArguments[1]) < 1 ) {

            return {
                id: ERRORS.invalidArguments,
                meta: `C arguments should have format [number number] (number > 0)`
            };

    } else {

        return {
            valid: VALID,
            width: Number.parseInt(commandArguments[0]),
            height: Number.parseInt(commandArguments[1]),
        };
    }
}

function lineArgumentsIsValid (commandArguments, width, height) {
    if (commandArguments.length !== 4) {

        return {
            id: ERRORS.invalidNumberOfArguments,
            meta: 'L should have 4 arguments'
        };

    } else if (lineRectangleFormatConditions(commandArguments, width, height)) {
        
        return {
            id: ERRORS.invalidArguments,
            meta: `L arguments should have format [x y x1 y1] (x, y, x1, y1 = number; 0 < x, x1 < ${width+1}; 0 < y, y1 < ${height+1})`
        };

    } else if (
        Number.parseInt(commandArguments[0]) !== Number.parseInt(commandArguments[2]) && 
        Number.parseInt(commandArguments[1]) !== Number.parseInt(commandArguments[3])) {

        return {
            id: ERRORS.invalidArguments,
            meta: `L can not execute for diagonal lines`
        };

    } else {

        return VALID;
    }
}

function rectangleArgumentsIsValid (commandArguments, width, height) {
    if (commandArguments.length !== 4) {

        return {
            id: ERRORS.invalidNumberOfArguments,
            meta: 'R should have 4 arguments'
        };

    } else if (lineRectangleFormatConditions(commandArguments, width, height)) {
        
        return {
            id: ERRORS.invalidArguments,
            meta: `R arguments should have format [x y x1 y1] (x, y, x1, y1 = number; 0 < x, x1 < ${width+1}; 0 < y, y1 < ${height+1})`
        };

    } else {

        return VALID;
    }
}

function bucketFillArgumentsIsValid (commandArguments, width, height) {
    if (commandArguments.length !== 3) {
        
        return {
            id: ERRORS.invalidNumberOfArguments,
            meta: 'B should have 3 arguments'
        };
      
    } else if (bucketFillFormatCondition(commandArguments, width, height)) {

        return {
            id: ERRORS.invalidArguments,
            meta: `B arguments should have format [x y color] (x, y = number; 0 < x < ${width+1}; 0 < y < ${height+1}; color = singl symbol)`
        };

    } else {

        return VALID;
    }
}

function commandDoesNotExist (command) {
    
    return {
        id: ERRORS.invalidFunction,
        meta: `${command} function does not exist`
    };
}

function lineRectangleFormatConditions(commandArguments, width, height) {

    return isNaN(Number.parseInt(commandArguments[0])) || 
    isNaN(Number.parseInt(commandArguments[1])) ||
    isNaN(Number.parseInt(commandArguments[2])) || 
    isNaN(Number.parseInt(commandArguments[3])) ||
    
    Number.parseInt(commandArguments[0]) < 1 ||
    Number.parseInt(commandArguments[1]) < 1 ||
    Number.parseInt(commandArguments[2]) < 1 ||
    Number.parseInt(commandArguments[3]) < 1 ||

    Number.parseInt(commandArguments[0]) > width  ||
    Number.parseInt(commandArguments[1]) > height ||
    Number.parseInt(commandArguments[2]) > width  ||
    Number.parseInt(commandArguments[3]) > height;
}

function bucketFillFormatCondition (commandArguments, width, height) {

    return isNaN(Number.parseInt(commandArguments[0])) || 
    isNaN(Number.parseInt(commandArguments[1])) ||
    
    Number.parseInt(commandArguments[0]) < 1 ||
    Number.parseInt(commandArguments[1]) < 1 ||

    Number.parseInt(commandArguments[0]) > width  ||
    Number.parseInt(commandArguments[1]) > height ||
    
    commandArguments[2].length < 1
}