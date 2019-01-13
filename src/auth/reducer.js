import { combineReducers } from "redux";
import { actionTypes as T } from "./constants";

export default combineReducers({
  isHydrating: (state = false, action) => {
    switch (action.type) {
      case T.HYDRATE_PENDING:
        return true;
      case T.HYDRATE:
        return false;
      default:
        return state;
    }
  },
  hasHydrated: (state = false, action) => {
    switch (action.type) {
      case T.HYDRATE:
        return true;
      default:
        return state;
    }
  },
  login: combineReducers({
    pending: (state = false, action) => {
      switch (action.type) {
        case T.LOGIN_PENDING:
          return true;
        case T.LOGIN_FULFILLED:
        case T.LOGIN_REJECTED:
        case T.LOGIN_CLEAR:
          return false;
        default:
          return state;
      }
    },
    error: (state = null, action) => {
      switch (action.type) {
        case T.LOGIN_PENDING:
        case T.LOGIN_FULFILLED:
        case T.LOGIN_CLEAR:
          return null;
        case T.LOGIN_REJECTED:
          return action.payload;
        default:
          return state;
      }
    }
  }),
  logout: combineReducers({
    pending: (state = false, action) => {
      switch (action.type) {
        case T.LOGOUT_PENDING:
          return true;
        case T.LOGOUT_FULFILLED:
        case T.LOGOUT_REJECTED:
          return false;
        default:
          return state;
      }
    },
    error: (state = null, action) => {
      switch (action.type) {
        case T.LOGOUT_PENDING:
        case T.LOGOUT_FULFILLED:
          return null;
        case T.LOGOUT_REJECTED:
          return action.payload;
        default:
          return state;
      }
    }
  }),
  uid: (state = null, action) => {
    switch (action.type) {
      case T.LOGIN_FULFILLED:
      case T.HYDRATE:
        return action.payload && action.payload.uid;
      default:
        return state;
    }
  },
  isAnonymous: (state = null, action) => {
    switch (action.type) {
      case T.LOGIN_FULFILLED:
      case T.HYDRATE:
        return action.payload && action.payload.isAnonymous;
      default:
        return state;
    }
  }
});
