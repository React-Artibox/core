// @flow

import React from 'react';

const APP_FLAG = 'React-Artibox';
const CONFIG_FLAG = `${APP_FLAG}/CONFIG`;
const METADATA_FLAG = `${APP_FLAG}/METADATA`;

export const ConfigContext = React.createContext(CONFIG_FLAG);
export const MetadataContext = React.createContext(METADATA_FLAG);

export default {
  ConfigContext,
  MetadataContext,
};
