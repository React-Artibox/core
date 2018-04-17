// @flow

import React from 'react';

const APP_FLAG = 'React-Artibox';
const CONFIG_FLAG = `${APP_FLAG}/CONFIG`;
const EDITOR_FLAG = `${APP_FLAG}/EDITOR`;

export const ConfigContext = React.createContext(CONFIG_FLAG);
export const EditorContext = React.createContext(EDITOR_FLAG);

export default {
  ConfigContext,
  EditorContext,
};
