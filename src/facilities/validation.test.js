import { isValid, VALID } from './validation';
import { ERRORS } from './constants';

test ('test function that does not exist', () => {
    const rule = [ 'N', '10', "svd", '20' ];
    const width = 10;
    const height = 10;

    const error = {
        id: ERRORS.invalidFunction,
        meta: `N function does not exist`
    }

    expect(isValid(rule, width, height)).toMatchObject(error);
});

test ('test canvas invalidNumberOfArguments', () => {
    const rule = [ 'C', '10', "svd", '10' ];

    const error = {
        id: ERRORS.invalidNumberOfArguments,
        meta: `C should have 2 arguments`
    }

    expect(isValid(rule)).toMatchObject(error);
});

test ('test canvas invalidArguments', () => {
    const rule = [ 'C', "vs", "svd" ];

    const error = {
        id: ERRORS.invalidArguments,
        meta: `C arguments should have format [number number] (number > 0)`
    }

    expect(isValid(rule)).toMatchObject(error);
});

test ('test canvas is Valid', () => {
    const rule = [ 'C', '10', '10' ];

    const valid = {
        valid: VALID,
        width: 10,
        height: 10,
    }

    expect(isValid(rule)).toMatchObject(valid);
});

test ('test line invalidNumberOfArguments', () => {
    const rule = [ 'L', "10", "10" ];
    const width = 10;
    const height = 10;

    const error = {
        id: ERRORS.invalidNumberOfArguments,
        meta: 'L should have 4 arguments'
    }

    expect(isValid(rule, width, height)).toMatchObject(error);
});

test ('test line invalidArguments', () => {
    const rule = [ 'L', "sdvsdb", "11", "fb", "10" ];
    const width = 10;
    const height = 10;

    const error = {
        id: ERRORS.invalidArguments,
        meta: `L arguments should have format [x y x1 y1] (x, y, x1, y1 = number; 0 < x, x1 < ${width+1}; 0 < y, y1 < ${height+1})`
    }

    expect(isValid(rule, width, height)).toMatchObject(error);
});

test ('test line for diagonal lines', () => {
    const rule = [ 'L', "4", "1", "2", "3" ];
    const width = 10;
    const height = 10;

    const error = {
        id: ERRORS.invalidArguments,
        meta: `L can not execute for diagonal lines`
    }

    expect(isValid(rule, width, height)).toMatchObject(error);
});

test ('test line is Valid', () => {
    const rule = [ 'L', "1", "2", "1", "5" ];
    const width = 10;
    const height = 10;

    expect(isValid(rule, width, height)).toBe(VALID);
});

test ('test rectangle invalidNumberOfArguments', () => {
    const rule = [ 'R', "1", "2", "3" ];
    const width = 10;
    const height = 10;

    const error = {
        id: ERRORS.invalidNumberOfArguments,
        meta: 'R should have 4 arguments'
    }

    expect(isValid(rule, width, height)).toMatchObject(error);
});

test ('test rectangle invalidArguments', () => {
    const rule = [ 'R', "15", "sdvd", "3", "vsd" ];
    const width = 10;
    const height = 10;

    const error = {
        id: ERRORS.invalidArguments,
        meta: `R arguments should have format [x y x1 y1] (x, y, x1, y1 = number; 0 < x, x1 < ${width+1}; 0 < y, y1 < ${height+1})`
    }

    expect(isValid(rule, width, height)).toMatchObject(error);
});

test ('test rectangle is Valid', () => {
    const rule = [ 'R', "1", "2", "4", "5" ];
    const width = 10;
    const height = 10;

    expect(isValid(rule, width, height)).toBe(VALID);
});

test ('test rectangle invalidNumberOfArguments', () => {
    const rule = [ 'B', "15", "sdvd", "3", "vsd" ];
    const width = 10;
    const height = 10;

    const error = {
        id: ERRORS.invalidNumberOfArguments,
        meta: 'B should have 3 arguments'
    }

    expect(isValid(rule, width, height)).toMatchObject(error);
});

test ('test rectangle invalidArguments', () => {
    const rule = [ 'B', "15", "sdvd", "3" ];
    const width = 10;
    const height = 10;

    const error = {
        id: ERRORS.invalidArguments,
        meta: `B arguments should have format [x y color] (x, y = number; 0 < x < ${width+1}; 0 < y < ${height+1}; color = singl symbol)`
    }

    expect(isValid(rule, width, height)).toMatchObject(error);
});

test ('test rectangle is Valid', () => {
    const rule = [ 'B', "1", "2", "red" ];
    const width = 10;
    const height = 10;

    expect(isValid(rule, width, height)).toBe(VALID);
});