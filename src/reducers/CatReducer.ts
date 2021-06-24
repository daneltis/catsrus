import { IMAGES_PER_PAGE } from "../apis/Images";
import { CatModel } from "../models/CatModel";

export class catState {
  cats: CatModel[];
  uploading: boolean;
  loaded: boolean;
  pages: number;
  page: number;
  constructor() {
    this.cats = [];
    this.uploading = false;
    this.loaded = false;
    this.pages = 0;
    this.page = 0;
  }
}

export const cats = (state: catState = new catState(), action: any) => {
  switch (action.type) {

    case 'GETCATS':

      let pages = 1;

      if ( action.pages > 0 ) {
        pages = Math.ceil(action.pages / IMAGES_PER_PAGE);
      }

      return { ...state, cats: action.response, loaded: true, page: action.page, pages: pages } 

    case 'GETCATS_FAIL':
      return { ...state, loaded: true }

    case 'UPLOAD_START':
      return { ...state, uploading: true }

    case 'UPLOAD_OK':
      return { ...state, uploading: false }

    case 'UPLOAD_FAIL':
      return { ...state, uploading: false }

  }

  return state;
};