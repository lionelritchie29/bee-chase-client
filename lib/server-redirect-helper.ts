export const redirectToHome = () => {
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

export const redirectToLogin = () => {
  return {
    redirect: {
      destination: '/auth/login',
      permanent: false,
    },
  };
};
