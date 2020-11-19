import { useState } from 'react';

function useForceUpdate() {
  const [updateCounter, setUpdateCounter] = useState(0);
  const forceUpdate = () => {
    setUpdateCounter(updateCounter + 1);
  };

  return [updateCounter, forceUpdate];
}

export { useForceUpdate };