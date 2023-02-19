export interface CollectionResponseI {
  data: CollectionResponseDataI[];
  message: string;
}

export interface CollectionResponseDataI {
  ID: number;
  Name: string;
  ParentId: number;
}

export interface CreateCollectionRequestI {
  name: string;
  parent: number;
}

export interface CreateCollectionResponseI {
  status: string;
}

export interface UpdateCollectionRequestI {
  id: number;
  name?: string;
  parent?: number;
  type: number;
}
