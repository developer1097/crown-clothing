import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCTeyDXt8npa4IWtq-x-H-ruKBGT65H-KY",
  authDomain: "crown-db-fef75.firebaseapp.com",
  projectId: "crown-db-fef75",
  storageBucket: "crown-db-fef75.appspot.com",
  messagingSenderId: "894219595362",
  appId: "1:894219595362:web:c72ecf486fc749f6ee2b3b",
  measurementId: "G-Y85WJZJBSC"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get();

  console.log(snapShot);

  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })

    } catch(error){
      console.log("error in creating the user",error.message);

    }
  }
  return userRef;
}

//to make new collection or doc if we want to create in firebase//

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  // console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj =>{
    const newDocRef = collectionRef.doc();
    // console.log(newDocRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit()
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const tranformedCollection = collections.docs.map(doc => {
    const {title, items} = doc.data();

    return{
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return tranformedCollection.reduce((accumulator ,collection) =>{
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
  // console.log(tranformedCollection);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
