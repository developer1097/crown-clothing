import { createSelector } from 'reselect';
import './directory.reducer';
const selectDirectory = state => state.directory;

export const selectDirectorySections = createSelector(
  [selectDirectory],
  directory => directory.sections
);