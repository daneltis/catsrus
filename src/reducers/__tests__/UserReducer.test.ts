import '@testing-library/jest-dom';
import { user, userState } from '../UserReducer';

test('default values initialised', () => {
    const state = user(new userState, {});
    expect(state.id).toBeNull();
});


test('set user', () => {
    const id =  "289bbeb3-dcbc-45b9-b9e5-e5e2f77d89d3";
    const state = user(new userState, {type: 'SETUSER', id: id});
    expect(state.id).toEqual(id);
});
    