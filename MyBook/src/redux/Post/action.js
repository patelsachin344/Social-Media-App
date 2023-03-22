export const POSTSUCCESS = "POSTSUCCESS";
export const POSTFAIL = "POSTFAIL";
export const POSTLOAD = "POSTLOAD";

export const post_success = (data) => {
  return {
    type: POSTSUCCESS,
    payload: data,
  };
};
export const post_fail = (data) => {
  return {
    type: POSTFAIL,
    payload: data,
  };
};
export const post_load = () => {
  return {
    type: POSTLOAD,
  };
};
