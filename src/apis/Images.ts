import { navigate } from "@reach/router";
import { getSubId, httpGet, postForm } from "./common";

export const IMAGES_PER_PAGE:number = 12;

export const upload = (file: File) => (dispatcher: any, getState: any) => {

  dispatcher({ type: 'UPLOAD_START' });

  let formdata = new FormData()
  formdata.append('file', file);
  formdata.append('sub_id', getSubId(getState));

  const result = postForm('/images/upload', formdata);

  result.then(response => {
    dispatcher({ type: 'UPLOAD_OK' });
    navigate("/");
  }, error => {
    dispatcher({ type: 'UPLOAD_FAIL' });
    dispatcher({ type: 'ERROR', error: error.message});
  });
}

export const getImages = (page: number) => (dispatcher: any, getState: any) => {

  const result = httpGet(`/images?order=desc&page=${page - 1}&limit=${IMAGES_PER_PAGE}`);

  result.then(response => {
    dispatcher({ type: 'GETCATS', response: response.body, page: page, pages: response.headers.get('pagination-count') });
  }, error => {
    dispatcher({ type: 'GETCATS_FAIL' });
    dispatcher({ type: 'ERROR', error: error.message});
  });
}
