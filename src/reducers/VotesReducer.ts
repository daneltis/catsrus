
export class votesState  {
  votes: Map<string, number>;
  myvotes: Map<string, number>;
  loaded: boolean;
  constructor() {
    this.votes = new Map();
    this.myvotes = new Map();
    this.loaded = false;
  }
}

const updateVotes = ( votes:Map<string, number>, image_id: string, value: number ) => {
  if ( votes.has(image_id) ) {
    let score = votes.get(image_id);
    if ( score !== undefined ) {
      value === 1 ? score++ : score--;
      votes.set(image_id, score);
    }
  } else {
    let score = 0;
    value === 1 ? score++ : score--;
    votes.set(image_id, score);
  }
}
  
export const votes = (state: votesState = new votesState(), action: any) => {

  switch (action.type) {
    
    case 'GETVOTES': 

      let votes:Map<string, number> = new Map();
      let myvotes:Map<string, number> = new Map();

      for ( const vote of action.votes ) {
        updateVotes(votes, vote.image_id, vote.value);
        if ( action.my_id === vote.sub_id ) {
          myvotes.set(vote.image_id, vote.value);
        }
      }

      return {...state, votes: votes, myvotes: myvotes, loaded: true};

    case 'GETVOTES_FAIL':
      return { ...state, loaded: true }

    case 'ADDVOTE': 

      let existingVotes = state.votes;
      let myVotes = state.myvotes;

      updateVotes(existingVotes, action.image_id, action.value);

      myVotes.set(action.image_id, action.value);

      return {...state, votes: existingVotes, myvotes: myVotes};
  }

  return state;
};