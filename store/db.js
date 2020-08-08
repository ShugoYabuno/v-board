import { db } from "~/plugins/firebase"

export const state = () => {}

export const actions = {
  async get(context, value) {
    const response = await db
      .collection(value)
      .get()
      .then((querySnapshot) => {
        const collection = []
        querySnapshot.forEach((doc) =>
          collection.push({ _id: doc.id, ...doc.data() })
        )
        return collection
      })
      .catch((err) => {
        return err
      })
    return response
  },
  async getColId(context, value) {
    const { col1, col1Id } = value
    const response = await db
      .collection(col1)
      .doc(col1Id)
      .get()
      .then((doc) => {
        return { _id: doc.id, ...doc.data() }
      })
      .catch((err) => {
        return err
      })
    return response
  },
  async get2ColId(context, value) {
    const { col1, col1Id, col2 } = value
    const response = await db
      .collection(col1)
      .doc(col1Id)
      .collection(col2)
      .get()
      .then((querySnapshot) => {
        const collection = []
        querySnapshot.forEach((doc) =>
          collection.push({ _id: doc.id, ...doc.data() })
        )
        return collection
      })
      .catch((err) => {
        return err
      })
    return response
  },
  async get3Col2Id(context, value) {
    const { col1, col1Id, col2, col2Id, col3 } = value
    const response = await db
      .collection(col1)
      .doc(col1Id)
      .collection(col2)
      .doc(col2Id)
      .collection(col3)
      .get()
      .then((querySnapshot) => {
        const collection = []
        querySnapshot.forEach((doc) =>
          collection.push({ _id: doc.id, ...doc.data() })
        )
        return collection
      })
      .catch((err) => {
        return err
      })
    return response
  },
}
