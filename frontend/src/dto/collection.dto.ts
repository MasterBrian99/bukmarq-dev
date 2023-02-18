export interface CollectionResponseI {
  data: CollectionResponseDataI[];
  message: string;
}

export interface CollectionResponseDataI {
  ID: number;
  Name: string;
  ParentId: number;
}
