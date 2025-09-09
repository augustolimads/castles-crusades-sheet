import { db } from 'src/Services/firebase'
import { collection, doc, getDoc, deleteDoc, addDoc, getDocs, updateDoc } from 'firebase/firestore'

const characterCollection = collection(db, 'characters')

export async function createCharacter(uid: string, characterData: any) {
    const docRef = await addDoc(characterCollection, { ...characterData, uid });
    return docRef.id;
}

export async function editCharacter(id: string, uid: string, characterData: any) {
    const characterDoc = doc(characterCollection, id)
    await updateDoc(characterDoc, characterData)
}

export async function deleteCharacter(id: string) {
    const characterDoc = doc(characterCollection, id)
    await deleteDoc(characterDoc)
}

export async function loadCharacter(id: string) {
    const characterDoc = doc(characterCollection, id)
    const characterSnapshot = await getDoc(characterDoc)
    if (!characterSnapshot.exists()) return null
    return characterSnapshot.data()
}

export async function listAllCharacters() {
    const snapshot = await getDocs(characterCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
