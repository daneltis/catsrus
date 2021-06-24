import { getSubId, httpDelete, httpGet, httpPost } from "./common";

export const FAVOURITES_PER_PAGE:number = 100;

// Get all the favourites for a user by sequentially paging through the results until we hit pagination-count
// note: this works ok when there aren't lots of favourites, would scale terribly!
export const getFavourites = () => async (dispatcher: any, getState: any) => {

  const subId = getSubId(getState);
  let results:any[] = [];
  let count = 1;

  for ( let page=0; page < count; page++ ) {

    if ( page <= count ) {
      const result = await httpGet(`/favourites?limit=${FAVOURITES_PER_PAGE}&page=${page}&sub_id=${subId}`);

      for (const item of result.body) {
        results.push(item);
      }

      let total = result.headers.get('pagination-count');
      count = Math.ceil(total / FAVOURITES_PER_PAGE);
    } 
  }

  dispatcher({ type: 'GETFAVOURITES', favourites: results });
}


export const addFavourite = (image_id: string) => (dispatcher: any, getState: any) => {

  const model = {
    image_id: image_id,
    sub_id: getSubId(getState)
  }

  const result = httpPost('/favourites', model);

  result.then(response => {
    dispatcher({ type: 'ADDFAVOURITE', image_id: image_id, favourite_id: response.body.id });
  }, error => {
    dispatcher({ type: 'ERROR', error: error.message});
  });
}


export const deleteFavourite = (image_id: string, favourite_id: string) => (dispatcher: any, getState: any) => {

  const result = httpDelete(`/favourites/${favourite_id}`);

  result.then(response => {
    dispatcher({ type: 'DELETEFAVOURITE', image_id: image_id });
  }, error => {
    dispatcher({ type: 'ERROR', error: error.message});
  });
}
