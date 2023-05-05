import firebase, { db } from "./config";

export const addDocument = (collection, data) => {
  db.collection(collection).add({
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const addDocumentWithDocumentId = (collection, document, data) => {
  db.collection(collection)
    .doc(`${document}`)
    .set({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export const updateDocumentWithDocumentId = (
  collection,
  document,
  dataUpdate
) => {
  db.collection(collection)
    .doc(`${document}`)
    .update({
      ...dataUpdate,
    });
};

export const isExistDocument = async (collection, document) => {
  const docRef = db.collection(collection).doc(`${document}`);

  return docRef.get().then((doc) => {
    if (doc.exists) {
      return true;
    } else {
      return false;
    }
  });
};
