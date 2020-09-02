export const redirect = async (router, data) => {
  if (!data.success) {
    router.push("/");
  }
  return;
};
