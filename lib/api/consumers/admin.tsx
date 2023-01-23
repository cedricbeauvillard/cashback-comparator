import {NextRouter} from 'next/router';

export const login = async (email: string, password: string, router: NextRouter) => {
  const res = await fetch(`/api/admin/login?email=${email}&password=${password}`);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  router.push(`/admin/backoffice?token=${data.token}`);
};

export const logout = async (router: NextRouter) => {
  const res = await fetch(`/api/admin/logout?token=${router.query.token}`);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  if (data) {
    router.push(`/admin/login`);
  } else {
    // TODO: PUSH MESSAGE
  }
};
