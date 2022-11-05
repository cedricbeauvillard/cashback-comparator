export const findManySeller = async (name: string) => {
  const res = await fetch(`/api/seller/findManySellersByName?name=${name}`);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export const fetchTopSellers = async (currentTopSellerAmount: number, fetchAmount: number) => {
  const res = await fetch(`/api/seller/topSeller?limit=${currentTopSellerAmount + fetchAmount}`);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export const findDetailedSeller = async (id: string) => {
  const res = await fetch(`/api/seller/findDetailedSeller?id=${id}`);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data[0];
};
