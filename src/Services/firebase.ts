import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app)

const actionCodeSettings = {
    url: import.meta.env.VITE_APP_URL ?? 'https://ficha.gutods.com.br',
    handleCodeInApp: true
};

export async function loginWithEmail(email: string) {
    try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem("emailForLogin", email);
        alert("Um link de login foi enviado para seu e-mail!");
    } catch (error) {
        console.error("Erro ao enviar link de login:", error);
    }
}

export async function validateLogin() {
    if (isSignInWithEmailLink(auth, window.location.href)) {
        const email = window.localStorage.getItem("emailForLogin");
        if (email) {
            try {
                const result = await signInWithEmailLink(auth, email, window.location.href);
                window.localStorage.removeItem("emailForLogin");
                window.location.replace("/")
                console.log("Usuário logado:", result.user);
            } catch (error) {
                console.error("Erro ao completar o login:", error);
            }
        }
    }
}

export function isLoggedIn() {
    let user: any = null;
    onAuthStateChanged(auth, (u) => {
        user = u;
    });

    return Boolean(user);
}

export async function logout() {
    await signOut(auth);
}