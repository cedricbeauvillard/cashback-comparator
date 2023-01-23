import {Seller} from '@prisma/client';
import {logger} from '../../../lib/logger';

export const findManySeller = async (name: string, onlyActives: boolean = true) => {
  const res = await fetch(
    `/api/seller/findManySellersByName?name=${name}&onlyActives=${onlyActives}`
  );
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

export const addSeller = async (
  seller: Seller,
  active?: boolean
): Promise<{added: boolean; status: number}> => {
  if (!seller || !seller.name) {
    logger.warn('Add seller: seller input or seller name null');
    return {added: false, status: 400};
  }

  const res = await fetch('/api/admin/addSeller', {
    method: 'POST',
    body: JSON.stringify({active: active, seller}),
  });

  return {added: res.status === 200, status: res.status};
};

export const removeSeller = async (id: number): Promise<{removed: boolean; status: number}> => {
  if (!id) {
    logger.warn('Remove seller: id is null');
    return {removed: false, status: 400};
  }

  const res = await fetch(`/api/admin/removeSeller?id=${id}`);

  return {removed: res.status === 200, status: res.status};
};

export const editSeller = async (
  id: number,
  seller: Seller,
  active?: boolean,
  cellToResetIndex?: number[]
): Promise<{edited: boolean; status: number}> => {
  if (!id || !seller) {
    logger.warn('Edit seller: seller input or seller id null');
    return {edited: false, status: 400};
  }

  const res = await fetch(`/api/admin/editSeller?id=${id}`, {
    method: 'POST',
    body: JSON.stringify({active, seller, cellToResetIndex}),
  });

  return {edited: res.status === 200, status: res.status};
};
