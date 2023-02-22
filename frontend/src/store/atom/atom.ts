import { atom } from 'recoil';

export const moveStateAtom = atom<{ child: number | null; parent: number | null }>({
  key: 'move',
  default: {
    child: null,
    parent: null,
  },
});
