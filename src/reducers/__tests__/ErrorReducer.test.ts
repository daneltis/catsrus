import '@testing-library/jest-dom';
import { errors, errorState } from '../ErrorReducer';

test('default values initialised', () => {
    const state = errors(new errorState, {});
    expect(state.errors.length).toEqual(0);
});


test('add error to empty', () => {
    const errorText = "An error occurred";
    const state = errors(new errorState, {type: 'ERROR', error: errorText});
    expect(state.errors.length).toEqual(1);
    expect(state.errors[0]).toEqual(errorText);
});

test('add error to non-empty list', () => {
    const firstErrorText = "An error occurred";
    const secondErrorText = "Another error occurred";
    let initialState = new errorState;
    initialState.errors.push(firstErrorText);
    const state = errors(initialState, {type: 'ERROR', error: secondErrorText});
    expect(state.errors.length).toEqual(2);
    expect(state.errors[0]).toEqual(firstErrorText);
    expect(state.errors[1]).toEqual(secondErrorText);
});


test('remove error', () => {
    const firstErrorText = "An error occurred";
    const secondErrorText = "Another error occurred";
    let initialState = new errorState;
    initialState.errors.push(firstErrorText);
    initialState.errors.push(secondErrorText);
    const state = errors(initialState, {type: 'DISMISS_ERROR', id: 0});
    expect(state.errors.length).toEqual(1);
    expect(state.errors[0]).toEqual(secondErrorText);
});
    