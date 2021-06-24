
export class userState  {
  id: string|null;
  constructor() {
    this.id = null;
  }
}
  
export const user = (state: userState = new userState(), action: any) => {
  switch (action.type) {

    case 'SETUSER': 
      return {...state, id: action.id}
      
  }

  return state;
};