"use client";

import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function AddShiftPattern() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "shiftPatterns"), {
        id,
        name,
        time,
        place,
      });
      alert("勤務パターンを追加しました！");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="仕業番号"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="時間"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <input
        placeholder="場所"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />
      <button type="submit">追加</button>
    </form>
  );
}
