import { moduleName } from "./constants";

export const auth = state => state[moduleName];
export const isHydrating = state => auth(state).isHydrating;
export const hasHydrated = state => auth(state).hasHydrated;
export const canHydrate = state => !isHydrating(state) && !hasHydrated(state);
export const isLoggingIn = state => auth(state).login.pending;
export const loginError = state => auth(state).login.error;
export const isLoggingOut = state => auth(state).logout.pending;
export const logoutError = state => auth(state).logout.error;
export const isLoggedIn = state =>
  auth(state).uid !== null && !auth(state).isAnonymous;
