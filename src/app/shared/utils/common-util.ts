export const getUser = () => {
  const token = localStorage.getItem('user');
  if (!token) {
    return;
  } else {
    return token;
  }
};
