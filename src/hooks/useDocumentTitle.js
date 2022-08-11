import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'SNKRS Paris - eCommerce ipssi project';
    }
  }, [title]);
};

export default useDocumentTitle;
