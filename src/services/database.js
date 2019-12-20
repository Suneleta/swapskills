import firebase from 'firebase';
import 'firebase/firestore';

function parseDoc(doc) {
  return {
    id: doc.id,
    ...doc.data(),
  };
}


function getDbInstance() {
  let db;
  if (!db || db._isTerminated) {
    db = firebase.firestore();
  }
  return db;
}

async function getAll(collection) {
  const db = getDbInstance();
  const collectionData = await db.collection(collection).get();

  const results = [];
  collectionData.forEach((document) => {
    results.push(parseDoc(document));
  });

  return results;
}

async function getAllFiltered({
  collection, filterDistrict, filterSkill, order, callback,
}) {
  console.log(filterDistrict, filterSkill);
  const db = getDbInstance();
  const dbCollection = db.collection(collection);
  const collectionFiltered = dbCollection
    .where(filterDistrict.field, filterDistrict.condition, filterDistrict.value)
    .where(filterSkill.field, filterSkill.condition, filterSkill.value);
  const collectionOrdered = collectionFiltered.orderBy(order);
  const llamaACallBackWithData = (collectionData) => callback(collectionData);
  collectionOrdered.onSnapshot(llamaACallBackWithData);
  if (collectionFiltered.exists) {
    return parseDoc(collectionFiltered);
  }
  return null;
}

async function getAllRealTime({
  collection, filters, order, callback,
}) {
  const db = getDbInstance();
  const dbCollection = db.collection(collection);
  const collectionFiltered = dbCollection.where(filters.field, filters.condition, filters.value);
  const collectionOrdered = collectionFiltered.orderBy(order);
  const llamaACallBackWithData = (collectionData) => callback(collectionData);
  collectionOrdered.onSnapshot(llamaACallBackWithData);
}

async function addItem(collection, item) {
  const db = getDbInstance();
  const result = await db.collection(collection).add(item);
  return !!result.id;
}

async function addItemWithId(collection, item, id) {
  const db = getDbInstance();
  const result = await db.collection(collection).doc(id).set(item);
  return !result;
}
async function updateItem(collection, item) {
  const db = getDbInstance();
  const result = await db.collection(collection).update(item);
  return !!result.id;
}


async function getItem(collection, itemId) {
  const db = getDbInstance();
  const document = await db.collection(collection).doc(itemId).get();

  if (document.exists) {
    return parseDoc(document);
  }
  return null;
}

async function deleteItem(collection, itemId) {
  const db = getDbInstance();
  const result = await db.collection(collection).doc(itemId).delete();
  return !result;
}

async function getMatchId(collection, id, idReceiver) {
  const db = getDbInstance();

  let matchId = '';

  await db.collection(collection)
    .where('id', '==', id)
    .where('idReceiver', '==', idReceiver)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        matchId = doc.id;
      });
    });

  return matchId;
}

async function updateByField(id, field, value) {
  const db = getDbInstance();
  const result = await db.collection('matches').doc(id).update({ [field]: value });
  console.log('result: ', result);

  if (result && result.id) return console.log('unable to updated field') || !!result.id;
  return console.log('unable to updated field');
}


export {
  getAll,
  addItem,
  getItem,
  getAllRealTime,
  deleteItem,
  addItemWithId,
  updateItem,
  getAllFiltered,
  getDbInstance,
  getMatchId,
  updateByField,
};
