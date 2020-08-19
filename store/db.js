import { db } from "~/plugins/firebase"

export const state = () => {}

export const actions = {
  async getCollection(context, value) {
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
  async get(context, value) {
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
  async create(context, value) {
    const { col, data } = value
    const res = await db.collection(col).add(data)
    return res
  },
  async update(context, value) {
    const { col, id, data } = value
    const res = await db.collection(col).doc(id).set(data)
    return res
  },
}
