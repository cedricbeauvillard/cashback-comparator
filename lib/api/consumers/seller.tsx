import {Seller} from '@prisma/client';

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

export const addSeller = async (seller: Seller, active?: boolean): Promise<{added: boolean}> => {
  if (!seller) {
    return {added: false};
  }

  const res = await fetch('/api/admin/addSeller', {
    method: 'POST',
    body: JSON.stringify({active: active, seller}),
  });

  if (res.status !== 200) {
    return {added: false};
  }

  return {added: true};
};

export const removeSeller = async (id: number): Promise<{removed: boolean}> => {
  if (!id) {
    return {removed: false};
  }

  const res = await fetch(`/api/admin/removeSeller?id=${id}`);

  if (res.status !== 200) {
    return {removed: false};
  }

  return {removed: true};
};

export const editSeller = async (seller: Seller, active?: boolean): Promise<{edited: boolean}> => {
  if (!seller) {
    return {edited: false};
  }

  const res = await fetch('/api/admin/editSeller', {
    method: 'POST',
    body: JSON.stringify({active: active, seller}),
  });

  if (res.status !== 200) {
    return {edited: false};
  }

  return {edited: true};
};
