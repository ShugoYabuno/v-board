import { firestore } from "./firebase"

const db = (() => {
  const add = async (_collectionName, _data) => {
    const res = await firestore.collection(_collectionName).add(_data)

    return res
  }

  const update = async (_collectionName, _id, _data) => {
    const res = await firestore
      .collection(_collectionName)
      .doc(_id)
      .update(_data)

    return res
  }

  return {
    add,
    update,
  }
})()

export default db
