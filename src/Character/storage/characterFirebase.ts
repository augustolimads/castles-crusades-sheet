import { db, auth } from 'src/Services/firebase'
import { collection, doc, getDoc, deleteDoc, addDoc, getDocs, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth';

const characterCollection = collection(db, 'characters')

let currentUser: any = null;

onAuthStateChanged(auth, (user) => {
    currentUser = user;
    console.log("Usuário logado:", user?.uid);
});

export async function createCharacterFirebase() {
    try {
        if (!currentUser) {
            throw new Error("Usuário não autenticado");
        }

        const docRef = await addDoc(characterCollection,
            {
                uid: currentUser.uid,
                createdAt: Date.now()
            });
        return docRef.id;
    } catch (error) {
        console.error("Error creating character:", error);
    }
}

export async function editCharacterFirebase(id: string, characterData: any) {
    const characterDoc = doc(characterCollection, id)
    await updateDoc(characterDoc, {
        ...characterData,
        id,
        updatedAt: Date.now()
    })
}

export async function deleteCharacterFirebase(id: string) {
    const characterDoc = doc(characterCollection, id)
    await deleteDoc(characterDoc)
}

export async function loadCharacterFirebase(id: string) {
    const characterDoc = doc(characterCollection, id)
    const characterSnapshot = await getDoc(characterDoc)
    if (!characterSnapshot.exists()) return null
    return characterSnapshot.data()
}

export async function listAllCharacters() {
    const snapshot = await getDocs(characterCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export function isMyCharacter(character: any): boolean {
    const currentUid = auth.currentUser?.uid;
    return !!currentUid && currentUid === character.uid;
}