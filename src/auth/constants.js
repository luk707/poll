export const moduleName = "auth";

export const actionTypes = {
  // Hydration
  HYDRATE_PENDING: `@@${moduleName}/HYDRATE_PENDING`,
  HYDRATE: `@@${moduleName}/HYDRATE`,
  // Login
  LOGIN_PENDING: `@@${moduleName}/LOGIN_PENDING`,
  LOGIN_FULFILLED: `@@${moduleName}/LOGIN_FULFILLED`,
  LOGIN_REJECTED: `@@${moduleName}/LOGIN_REJECTED`,
  LOGIN_CLEAR: `@@${moduleName}/LOGIN_CLEAR`,
  // Logout
  LOGOUT_PENDING: `@@${moduleName}/LOGOUT_PENDING`,
  LOGOUT_FULFILLED: `@@${moduleName}/LOGOUT_FULFILLED`,
  LOGOUT_REJECTED: `@@${moduleName}/LOGOUT_REJECTED`
};
