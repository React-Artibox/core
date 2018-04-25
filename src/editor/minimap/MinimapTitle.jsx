// @flow

import React from 'react';

const styles = {
  line: {
    fontSize: 10,
    margin: 0,
    lineHeight: 1.5,
    fontWeight: 400,
  },
};

function MinimapTitle({
  value,
}: {
  value: string,
}) {
  return (
    <p style={styles.line}>{value}</p>
  );
}

export default MinimapTitle;
