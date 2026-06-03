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
      alert("✅ 勤務パターンを追加しました");
      setId("");
      setName("");
      setTime("");
      setPlace("");
    } catch (error) {
      console.error("❌ エラー: ", error);
      alert("登録に失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h2>勤務パターン追加</h2>
      <div>
        <label>仕業番号/ID：</label>
        <input value={id} onChange={(e) => setId(e.target.value)} required />
      </div>
      <div>
        <label>勤務名：</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>時間：</label>
        <input value={time} onChange={(e) => setTime(e.target.value)} required />
      </div>
      <div>
        <label>場所：</label>
        <input value={place} onChange={(e) => setPlace(e.target.value)} />
      </div>
      <button type="submit">追加</button>
    </form>
  );
}
