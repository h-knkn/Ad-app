import {db, FirebaseTimestamp} from '../../firebase/index';
import {push} from "connected-react-router";

const productsRef = db.collection('products')


export const saveProduct = (title, description, category, tags, mission, memo, images) => {
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
            updated_at: timestamp
        }
        const ref = productsRef.doc();
        const id = ref.id;
        data.id = id;
        data.created_at = timestamp;

        return productsRef.doc(id).set(data)
            .then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })

    }
}