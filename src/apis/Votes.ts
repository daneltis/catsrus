import { getSubId, httpGet, httpPost } from "./common";

export const VOTES_PER_PAGE:number = 100;

// Get all the votes by sequentially paging through the results until we hit pagination-count
// note: this works ok when there aren't lots of votes, would scale terribly!
export const getVotes = () => async (dispatcher: any, getState: any) => {

  let results:any[] = [];
  let count = 1;

  for ( let page=0; page < count; page++ ) {

    if ( page <= count ) {
      const result = await httpGet(`/votes?limit=${VOTES_PER_PAGE}&page=${page}`);

      for (const item of result.body) {
        results.push(item);
      }

      let total = result.headers.get('pagination-count');
      count = Math.ceil(total / VOTES_PER_PAGE);
    } 
  }

  dispatcher({ type: 'GETVOTES', votes: results, my_id: getState().user.id });
}


export const vote = (image_id: string, up: boolean) => (dispatcher: any, getState: any) => {

  const model = {
    image_id: image_id,
    value: up ? 1 : 0,
    sub_id: getSubId(getState)
  }

  const result = httpPost('/votes', model);

  result.then(response => {
    dispatcher({ type: 'ADDVOTE', image_id: model.image_id, value: model.value });
  }, error => {
    dispatcher({ type: 'ERROR', error: error.message});
  });
}


