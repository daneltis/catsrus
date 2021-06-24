export const getSubId = ( getState: any ):string => {
  return getState().user.id;
}

export const postForm = async(url: string, formdata: FormData) => {
  return await request(url, "POST", {'Accept': 'application/json'}, formdata);
}

export const httpGet = async (url: string, convertToJson: boolean=true) => {
  return await request(url, "GET", {'Accept': 'application/json'});
}

export const httpPost = async (url: string, body: any) => {
  return await request(url, "POST", {'Accept': 'application/json', 'Content-Type': 'application/json'}, JSON.stringify(body));
}

export const httpDelete = async (url: string) => {
  return await request(url, "DELETE", {'Accept': 'application/json'});
}

interface Response {
  body: any;
  headers: any;
}

const request = async (url: string, method: string="GET", headers:any={}, body:any=null):Promise<Response> => {

  const params = {
    method: method,
    body: body,
    headers: Object.assign(
      {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
      headers
    )
  }
  const result = await fetch(`https://api.thecatapi.com/v1${url}`, params);

  if ( !result.ok ) {
    const body = await result.json();
    throw new Error(body.message);
  }

  return {
    body: await result.json(),
    headers: result.headers,
  }
}