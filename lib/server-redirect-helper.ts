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

export const redirectToPlay = (gameId: string) => {
  return {
    redirect: {
      destination: `/games/${gameId}/play`,
      permanent: false,
    },
  };
};

export const redirectToTeamPage = (gameId: string) => {
  return {
    redirect: {
      destination: `/games/${gameId}/teams`,
      permanent: false,
    },
  };
};
