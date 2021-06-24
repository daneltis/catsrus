import { FavouriteModel } from "../models/FavouriteModel";

export class favouriteState  {
  favourites: Map<string, FavouriteModel>;
  loaded: boolean;
  constructor() {
    this.favourites = new Map();
    this.loaded = false;
  }
}
  
export const favourites = (state: favouriteState = new favouriteState(), action: any) => {
  switch (action.type) {

    case 'GETFAVOURITES':

      let favourites:Map<string, FavouriteModel> = new Map();

      for ( const favourite of action.favourites ) {
        favourites.set(favourite.image_id, favourite);
      }

      return {...state, favourites: favourites, loaded: true}

    case 'GETFAVOURITES_FAIL':
      return {...state, loaded: true}


    case 'ADDFAVOURITE': 

      let addfavourites = state.favourites;
      let model:FavouriteModel = {
        id: action.favourite_id,
        image_id: action.image_id
      }

      addfavourites.set(model.image_id, model);

      return {...state, favourites: addfavourites}

    case 'DELETEFAVOURITE': 

      let deletefavourites = state.favourites;

      deletefavourites.delete(action.image_id);

      return {...state, favourites: deletefavourites}

  }

  return state;
};