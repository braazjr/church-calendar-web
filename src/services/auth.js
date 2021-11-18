import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const signWithGoogle = () => {
    return signInWithPopup(auth, provider)
        .then((result) => {
            console.log("result", result);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        })
        .catch((error) => {
            console.error(error);
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
};

export const logout = () => {
    return signOut(auth)
        .then(() => console.info('sign out'))
        .catch(error => console.error('SIGN_OUT_ERROR', error))
}