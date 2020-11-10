export const getUser = () => {
  const token = localStorage.getItem('user');
  console.log(token);
  if (!token) {
    return;
  } else {
    return token;
  }
};
