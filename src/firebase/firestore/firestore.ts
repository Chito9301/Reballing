// src/firebase/firestore/firestore.ts

import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  QueryConstraint, 
  DocumentData 
} from "firebase/firestore";
import { db } from "../../lib/firebase";  // Ajusta la ruta según tu estructura

/**
 * Agrega un nuevo documento a una colección específica.
 * @param collectionName Nombre de la colección en Firestore.
 * @param data Objeto con los datos a guardar.
 * @returns Objeto con el id del documento creado o error.
 */
export async function addData(
  collectionName: string, 
  data: DocumentData
): Promise<{ id: string | null; error: string | null }> {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message || "Error desconocido" };
  }
}

/**
 * Obtiene todos los documentos de una colección.
 * @param collectionName Nombre de la colección en Firestore.
 * @returns Objeto con un array de documentos o error.
 */
export async function getData(
  collectionName: string
): Promise<{ docs: DocumentData[]; error: string | null }> {
  try {
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { docs, error: null };
  } catch (error: any) {
    return { docs: [], error: error.message || "Error desconocido" };
  }
}

/**
 * Obtiene documentos filtrados por condiciones.
 * @param collectionName Nombre de la colección.
 * @param filters Array de condiciones (where) para filtrar la consulta.
 * @returns Objeto con array de documentos o error.
 */
export async function getDataWithFilters(
  collectionName: string,
  filters: QueryConstraint[]
): Promise<{ docs: DocumentData[]; error: string | null }> {
  try {
    const q = query(collection(db, collectionName), ...filters);
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { docs, error: null };
  } catch (error: any) {
    return { docs: [], error: error.message || "Error desconocido" };
  }
}

