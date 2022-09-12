import { actionExampleGetList } from 'entities/example/model/actions';
import { examplePaths } from 'entities/example/model/constants';
import { ExampleItemPage } from 'pages/Example/ExampleItemPage';
import { ExampleListPage } from 'pages/Example/ExampleList';
import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks';

export const ExamplePage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actionExampleGetList);
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<ExampleItemPage />} path={examplePaths.item} />
      <Route element={<ExampleListPage />} path={examplePaths.list} />
    </Routes>
  );
};

