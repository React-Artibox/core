// @flow

import React from 'react';

const styles = {
  line: {
    fontSize: 6,
    margin: 0,
    lineHeight: 1.25,
    fontWeight: 300,
  },
};

function MinimapParagraph({
  value,
}: {
  value: string,
}) {
  return (
    <p style={styles.line}>{value}</p>
  );
}

export default MinimapParagraph;
