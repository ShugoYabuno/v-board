import { firestore } from "./firebase"

const firestoreService = (() => {
  const add = async (_collectionName, _data) => {
    const value = {
      ..._data,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    const res = await firestore.collection(_collectionName).add(value)
      .then(async (docRef) => {
        const data = await docRef.get().then(doc => doc.data())
        return {
          documentId: docRef.id,
          data
        }
      })

    return res
  }

  const update = async (_collectionName, _id, _data) => {
    const value = {
      ..._data,
      updatedAt: Date.now()
    }
    const docRef = firestore.collection(_collectionName).doc(_id)
    await docRef.update(value)
    const data = await docRef.get().then(doc => doc.data())

    return {
      documentId: docRef.id,
      data
    }
  }

  return {
    add,
    update,
  }
})()

export default firestoreService
