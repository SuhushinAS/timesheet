import { AppDispatch } from 'shared/config/store';

export type TErrorResult = {
  errorMessages: string[];
  errors: TErrors;
  statusCode: number;
};

export type TErrors = Record<string, string>;
export type TAction<TResult> = (dispatch: AppDispatch) => TResult;
export type TAsyncAction<TResult> = TAction<Promise<TResult>>;
export type TActionData<TData, TResult> = (data: TData) => TAction<TResult>;
export type TAsyncActionData<TData, TResult> = (data: TData) => TAsyncAction<TResult>;
