export const submitUserMessage = async (email: string, name: string, message: string) => {
  // TODO: Securize (injections...)
  const res = await fetch(`/api/user/submitMessage?email=${email}&name=${name}&message=${message}`);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};
