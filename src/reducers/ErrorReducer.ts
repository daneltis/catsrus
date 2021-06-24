
export class errorState {
  errors: string[];
  constructor() {
    this.errors = [];
  }
}

export const errors = (state: errorState = new errorState(), action: any) => {
  switch (action.type) {

    case 'ERROR':
      let mutate = state.errors.splice(0);
      mutate.push(action.error);
      return { ...state, errors: mutate } 

    case 'DISMISS_ERROR':

      let errors = [];

      for (let i=0; i<state.errors.length; i++) {
        if ( i !== action.id ) {
          errors.push(state.errors[i]);
        }
      }

      return { ...state, errors: errors }
  }

  return state;
};