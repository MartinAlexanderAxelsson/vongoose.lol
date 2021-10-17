import { useState, useEffect } from "react"
import app from "./firebaseConfig"
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"

const db = getFirestore(app)
const qry = query(collection(db, "assets"))

function GetFiles() {
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      const fetch = await getDocs(qry)
      fetch.forEach((doc) => {
        setData(doc.data())
      })
    }

    getData()
  }, [])
}
export default GetFiles
