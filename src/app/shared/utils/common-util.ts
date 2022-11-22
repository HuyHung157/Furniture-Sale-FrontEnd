export const getUser = () => {
  //TODO: check real token
  const token = localStorage.getItem('user');
  if (!token) {
    return;
  } else {
    return token;
  }
};
