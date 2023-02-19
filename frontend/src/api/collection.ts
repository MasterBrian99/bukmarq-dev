import {
  CollectionResponseI,
  CreateCollectionRequestI,
  CreateCollectionResponseI,
  UpdateCollectionRequestI,
} from '../dto/collection.dto';
import httpClient from '../http/httpClient';

export const getCollectionByParentID = async (
  id: number,
): Promise<CollectionResponseI> => {
  const res = await httpClient.get(`collection/parent/${id}`);
  return res.data as CollectionResponseI;
};

export const createCollection = async (
  data: CreateCollectionRequestI,
): Promise<CreateCollectionResponseI> => {
  const res = await httpClient.post(`collection`, data);
  return res.data as CreateCollectionResponseI;
};

export const updateCollection = async (
  data: UpdateCollectionRequestI,
): Promise<CreateCollectionResponseI> => {
  const res = await httpClient.put(`collection`, data);
  return res.data as CreateCollectionResponseI;
};
