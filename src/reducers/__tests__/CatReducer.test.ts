import '@testing-library/jest-dom';
import { cats, catState } from '../CatReducer';

test('default values initialised', () => {
    const state = cats(new catState, {});
    expect(state.loaded).toEqual(false);
    expect(state.cats.length).toEqual(0);
    expect(state.uploading).toEqual(false);
    expect(state.pages).toEqual(0);
    expect(state.page).toEqual(0);
});


test('get cats', () => {
    const response = [{"breeds":[],"id":"Nwo1dV2Lm","url":"https://cdn2.thecatapi.com/images/Nwo1dV2Lm.jpg","width":976,"height":549,"sub_id":"e2f29a8f-f2c5-4327-a64c-65435ab52b53","created_at":"2021-06-24T10:45:19.000Z","original_filename":"_111434467_gettyimages-1143489763.jpg","breed_ids":null},{"breeds":[],"id":"nAI32OuDC","url":"https://cdn2.thecatapi.com/images/nAI32OuDC.png","width":966,"height":780,"sub_id":"e2f29a8f-f2c5-4327-a64c-65435ab52b53","created_at":"2021-06-24T10:44:24.000Z","original_filename":"cutecat.png","breed_ids":null},{"breeds":[],"id":"Akv20E4ya","url":"https://cdn2.thecatapi.com/images/Akv20E4ya.jpg","width":645,"height":645,"sub_id":"e2f29a8f-f2c5-4327-a64c-65435ab52b53","created_at":"2021-06-24T10:43:11.000Z","original_filename":"GettyImages-513859318-645x645.jpg","breed_ids":null},{"breeds":[],"id":"YOAGET02s","url":"https://cdn2.thecatapi.com/images/YOAGET02s.jpg","width":926,"height":615,"sub_id":"e2f29a8f-f2c5-4327-a64c-65435ab52b53","created_at":"2021-06-24T10:43:01.000Z","original_filename":"file-20200803-24-50u91u.jpg","breed_ids":null},{"breeds":[],"id":"nXkz5ipUa","url":"https://cdn2.thecatapi.com/images/nXkz5ipUa.jpg","width":2300,"height":1533,"sub_id":"e2f29a8f-f2c5-4327-a64c-65435ab52b53","created_at":"2021-06-24T10:42:51.000Z","original_filename":"Science_Cats-84873657.jpg","breed_ids":null},{"breeds":[],"id":"DsNPNwZhm","url":"https://cdn2.thecatapi.com/images/DsNPNwZhm.jpg","width":660,"height":433,"sub_id":"e2f29a8f-f2c5-4327-a64c-65435ab52b53","created_at":"2021-06-24T10:42:39.000Z","original_filename":"93347270_cat-1151519_1280.jpg","breed_ids":null},{"breeds":[],"id":"zo3fVP_z8","url":"https://cdn2.thecatapi.com/images/zo3fVP_z8.jpg","width":788,"height":600,"sub_id":"e2f29a8f-f2c5-4327-a64c-65435ab52b53","created_at":"2021-06-24T10:41:47.000Z","original_filename":"5ii.jpg","breed_ids":null},{"breeds":[],"id":"nNGk5DnDC","url":"https://cdn2.thecatapi.com/images/nNGk5DnDC.jpg","width":400,"height":300,"sub_id":"e2f29a8f-f2c5-4327-a64c-65435ab52b53","created_at":"2021-06-24T10:41:37.000Z","original_filename":"bev.jpg","breed_ids":null},{"breeds":[],"id":"GY25a2pyJ","url":"https://cdn2.thecatapi.com/images/GY25a2pyJ.jpg","width":1200,"height":801,"sub_id":"e2f29a8f-f2c5-4327-a64c-65435ab52b53","created_at":"2021-06-24T10:41:18.000Z","original_filename":"shutterstock_707431309-e1554172878508.jpg","breed_ids":null},{"breeds":[],"id":"EYuOqI8ro","url":"https://cdn2.thecatapi.com/images/EYuOqI8ro.jpg","width":2048,"height":1366,"sub_id":"e2f29a8f-f2c5-4327-a64c-65435ab52b53","created_at":"2021-06-24T10:40:24.000Z","original_filename":"merlin_160087014_de761d9a-4360-402d-a15b-ddeff775760d-superJumbo.jpg","breed_ids":null},{"breeds":[],"id":"AJXb4_XZT","url":"https://cdn2.thecatapi.com/images/AJXb4_XZT.png","width":1280,"height":1280,"sub_id":"289bbeb3-dcbc-45b9-b9e5-e5e2f77d89d3","created_at":"2021-06-24T10:05:24.000Z","original_filename":"1280px-VAN_CAT.png","breed_ids":null},{"breeds":[],"id":"370BCaa7x","url":"https://cdn2.thecatapi.com/images/370BCaa7x.jpg","width":800,"height":534,"sub_id":"289bbeb3-dcbc-45b9-b9e5-e5e2f77d89d3","created_at":"2021-06-24T07:52:11.000Z","original_filename":"Domestic-feline-tabby-cat.jpg","breed_ids":null}];
    const state = cats(new catState, {type: 'GETCATS', response: response, page: 1, pages: 17});
    expect(state.loaded).toEqual(true);
    expect(state.cats.length).toEqual(12);
    expect(state.uploading).toEqual(false);
    expect(state.pages).toEqual(2);
    expect(state.page).toEqual(1);
});
    