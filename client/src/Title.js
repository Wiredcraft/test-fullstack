import { useEffect } from 'react';

const Title = ({ text }) => {
  useEffect(() => {
    document.title = `${text} | Talk Lightning`;
  }, [ text ]);

  return null;
}

export default Title;
