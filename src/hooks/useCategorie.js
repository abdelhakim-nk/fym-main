import { useDidMount } from 'hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'services/firebase';

const useCategorie = (id) => {
  // get and check if categorie exists in store
  // eslint-disable-next-line max-len
  const storeCategorie = useSelector((state) => state.categorie.items.find((item) => item.id === id));

  const [categorie, setCategorie] = useState(storeCategorie);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const didMount = useDidMount(true);

  useEffect(() => {
    (async () => {
      try {
        if (!categorie || categorie.id !== id) {
          setLoading(true);
          const doc = await firebase.getSingleCategorie(id);

          if (doc.exists) {
            const data = { ...doc.data(), id: doc.ref.id };

            if (didMount) {
              setCategorie(data);
              setLoading(false);
            }
          } else {
            setError('Categorie not found.');
          }
        }
      } catch (err) {
        if (didMount) {
          setLoading(false);
          setError(err?.message || 'Something went wrong.');
        }
      }
    })();
  }, [id]);

  return { categorie, isLoading, error };
};

export default useCategorie;
