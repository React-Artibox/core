// @flow

import React from 'react';

const styles = {
  wrapper: {
    textAlign: 'center',
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
};

function MinimapImage({
  value,
}: {
  value: string,
}) {
  return (
    <div style={styles.wrapper}>
      <img style={styles.img} src={value} alt="" />
    </div>
  );
}

export default MinimapImage;
