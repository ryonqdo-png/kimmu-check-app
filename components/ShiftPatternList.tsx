"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ShiftPatternList() {
  type ShiftPattern = {
  id: string;
  number?: string;
  name?: string;
  place?: string;
  time?: string;
};

const [patterns, setPatterns] = useState<ShiftPattern[]>([]);

  // Firestore からデータ取得
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "shiftPatterns"));
      setPatterns(
        querySnapshot.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        }))
      );
    };
    fetchData();
  }, []);

  // 削除処理
  const handleDelete = async (id: string) => {
    if (!confirm("この勤務パターンを削除しますか？")) return;
    await deleteDoc(doc(db, "shiftPatterns", id));
    setPatterns((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">勤務パターン一覧</h2>
      <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">名前</th>
            <th className="px-4 py-2 border">場所</th>
            <th className="px-4 py-2 border">時間</th>
            <th className="px-4 py-2 border text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          {patterns.map((pattern) => (
            <tr key={pattern.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{pattern.name}</td>
              <td className="px-4 py-2 border">{pattern.place}</td>
              <td className="px-4 py-2 border">{pattern.time}</td>
              <td className="px-4 py-2 border text-center">
                <button
                  onClick={() => handleDelete(pattern.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
