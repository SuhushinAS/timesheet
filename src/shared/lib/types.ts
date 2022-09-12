export type TGetId<T> = (item: T) => string;

export type TGetEntry<T> = (item: T) => [string, T];

export type TGetList<T> = (list: T[]) => {
  data: Record<string, T>;
  list: string[];
};

export type TEntityShort = {
  display: string;
  id: string;
  self: string;
};

export type TEntityShortKey = TEntityShort & {
  key: string;
};
