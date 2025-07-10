import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function addData(collectionName: string, data: any) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
}

export async function getData(collectionName: string) {
  try {
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { docs, error: null };
  } catch (error: any) {
    return { docs: [], error: error.message };
  }
}
