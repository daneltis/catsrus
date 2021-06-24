import '@testing-library/jest-dom';
import { favourites, favouriteState } from '../FavouritesReducer';


const testData = [{"id":2092071,"user_id":"0vj587","image_id":"yypND5olK","sub_id":"289bbeb3-dcbc-45b9-b9e5-e5e2f77d89d3","created_at":"2021-06-23T16:32:12.000Z","image":{}},{"id":2092073,"user_id":"0vj587","image_id":"hTSwzpTik","sub_id":"289bbeb3-dcbc-45b9-b9e5-e5e2f77d89d3","created_at":"2021-06-23T16:35:31.000Z","image":{}},{"id":2092091,"user_id":"0vj587","image_id":"v2B3HVDyW","sub_id":"289bbeb3-dcbc-45b9-b9e5-e5e2f77d89d3","created_at":"2021-06-23T22:48:44.000Z","image":{}},{"id":2092092,"user_id":"0vj587","image_id":"_yoIujRSq","sub_id":"289bbeb3-dcbc-45b9-b9e5-e5e2f77d89d3","created_at":"2021-06-23T23:03:58.000Z","image":{}},{"id":2092093,"user_id":"0vj587","image_id":"AWAHw3i2A","sub_id":"289bbeb3-dcbc-45b9-b9e5-e5e2f77d89d3","created_at":"2021-06-23T23:04:01.000Z","image":{}},{"id":2092094,"user_id":"0vj587","image_id":"61DtNWnsM","sub_id":"289bbeb3-dcbc-45b9-b9e5-e5e2f77d89d3","created_at":"2021-06-23T23:13:41.000Z","image":{}},{"id":2092095,"user_id":"0vj587","image_id":"Xn6JE9TmR","sub_id":"289bbeb3-dcbc-45b9-b9e5-e5e2f77d89d3","created_at":"2021-06-23T23:13:42.000Z","image":{}},{"id":2092096,"user_id":"0vj587","image_id":"wkivlK7x3","sub_id":"289bbeb3-dcbc-45b9-b9e5-e5e2f77d89d3","created_at":"2021-06-24T00:49:52.000Z","image":{"id":"wkivlK7x3","url":"https://cdn2.thecatapi.com/images/wkivlK7x3.jpg"}},{"id":2092124,"user_id":"0vj587","image_id":"AJXb4_XZT","sub_id":"289bbeb3-dcbc-45b9-b9e5-e5e2f77d89d3","created_at":"2021-06-24T10:11:21.000Z","image":{"id":"AJXb4_XZT","url":"https://cdn2.thecatapi.com/images/AJXb4_XZT.png"}},{"id":2092125,"user_id":"0vj587","image_id":"nNGk5DnDC","sub_id":"289bbeb3-dcbc-45b9-b9e5-e5e2f77d89d3","created_at":"2021-06-24T10:49:31.000Z","image":{"id":"nNGk5DnDC","url":"https://cdn2.thecatapi.com/images/nNGk5DnDC.jpg"}}];

test('default values initialised', () => {
    const state = favourites(new favouriteState, {});
    expect(state.loaded).toEqual(false);
    expect(state.favourites.size).toEqual(0);
});


test('get favourites', () => {
   const state = favourites(new favouriteState, {type: 'GETFAVOURITES', favourites: testData});
    expect(state.loaded).toEqual(true);
    expect(state.favourites.size).toEqual(10);
    expect(state.favourites.get("yypND5olK")?.id).toEqual(2092071);
    expect(state.favourites.get("hTSwzpTik")?.id).toEqual(2092073);
});


test('add favourite', () => {
    let initialState = favourites(new favouriteState, {type: 'GETFAVOURITES', favourites: testData});

    const state = favourites(initialState, {type: 'ADDFAVOURITE', favourite_id: 123, image_id: "ABC"});
    expect(state.favourites.size).toEqual(11);
    expect(state.favourites.get("ABC")?.id).toEqual(123);
});


test('delete favourite', () => {
    let initialState = favourites(new favouriteState, {type: 'GETFAVOURITES', favourites: testData});

    const state = favourites(initialState, {type: 'DELETEFAVOURITE', image_id: "yypND5olK"});
    expect(state.favourites.size).toEqual(9);
    expect(state.favourites.get("yypND5olK")).toBe(undefined); // gone?
    expect(state.favourites.get("hTSwzpTik")?.id).toEqual(2092073); // still there?
});