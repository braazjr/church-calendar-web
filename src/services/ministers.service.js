import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

import { db } from '../firebase';

export const getMinisters = async () => {
    const querySnapshot = await getDocs(collection(db, "ministers"));

    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
}

export const getMinisterById = async (id) => {
    return getDoc(doc(db, 'ministers', id))
        .then(doc => ({ id: doc.id, ...doc.data() }))
}

export const saveMinister = async (minister) => {
    return setDoc(doc(db, 'ministers'), minister)
}

export const updateMinister = async (id, minister) => {
    return updateDoc(doc(db, 'ministers', id), { ...minister })
}