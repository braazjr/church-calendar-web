
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../firebase';

export const getTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));

    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
}