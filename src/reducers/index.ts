import { combineReducers } from 'redux';
import { cats, catState } from './CatReducer';
import { errors, errorState } from './ErrorReducer';
import { favourites, favouriteState } from './FavouritesReducer';
import { user, userState } from './UserReducer';
import { votes, votesState } from './VotesReducer';


export const rootReducer = combineReducers({
    cats, favourites, votes, user, errors
}); 

export interface RootState {
    cats: catState,
    favourites: favouriteState,
    votes: votesState,
    user: userState,
    errors: errorState
}
  