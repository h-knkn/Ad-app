import {db, FirebaseTimestamp} from '../../firebase/index';
import {push} from "connected-react-router";
import {fetchProductsAction} from "./actions"

const productsRef = db.collection('products');

export const fetchProducts = () => {
    return async(dispatch) => {
        productsRef
          .orderBy("updated_at", "desc")
          .get()
          .then((snapshots) => {
            const productList = [];
            snapshots.forEach((snapshot) => {
              const product = snapshot.data();
              productList.push(product);
            });
            dispatch(fetchProductsAction(productList));
          });

    }
}


export const saveProduct = (
  id,
  title,
  description,
  category,
  tags,
  mission,
  memo,
  images,
  startDate,
) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      title: title,
      description: description,
      tags: tags,
      category: category,
      mission: mission,
      memo: memo,
      images: images,
      updated_at: timestamp,
    //   announceday: startDate,
    };
    if (id === "") {
      const ref = productsRef.doc();
      id = ref.id;
      data.id = id;
      data.created_at = timestamp;
    }

    return productsRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};