import { CollectionResponseI } from '../dto/collection.dto';
import httpClient from '../http/httpClient';

export const getCollectionByParentID = async (
  id: number,
): Promise<CollectionResponseI> => {
  const res = await httpClient.get(`collection/parent/${id}`);
  return res.data as CollectionResponseI;
};
