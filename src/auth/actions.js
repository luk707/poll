import { actionTypes as T } from "./constants";
import { canHydrate } from "./selectors";
import { auth } from "../firebase";

export const hydrate = () => (dispatch, getState) => {
  if (!canHydrate(getState())) {
    return;
  }
  dispatch({ type: T.HYDRATE_PENDING });
  auth.onAuthStateChanged(user => {
    dispatch({ type: T.HYDRATE, payload: user });
  });
};

export const login = (
  email,
  password,
  { onSuccess = () => {} } = {}
) => dispatch => {
  dispatch({ type: T.LOGIN_PENDING });
  auth
    .signInWithEmailAndPassword(email, password)
    .then(data => {
      dispatch({ type: T.LOGIN_FULFILLED, payload: data.user });
      onSuccess();
    })
    .catch(error =>
      dispatch({
        type: T.LOGIN_REJECTED,
        payload: (error && error.message) || "Unknown error occured."
      })
    );
};

export const clearLogin = () => ({ type: T.LOGIN_CLEAR });

export const logout = ({ onSuccess = () => {} } = {}) => dispatch => {
  dispatch({ type: T.LOGOUT_PENDING });
  auth
    .signOut()
    .then(() => {
      dispatch({ type: T.LOGOUT_FULFILLED });
      onSuccess();
    })
    .catch(error =>
      dispatch({
        type: T.LOGIN_REJECTED,
        payload: (error && error.message) || "Unknown error occured."
      })
    );
};
