"use client";

import { useEffect, useState } from "react";

type ShiftItem = {
  no: string;
  time: string;
};

const defaultTable: ShiftItem[] = [
  { no: "1", time: "07:10" },
  { no: "2", time: "07:35" },
  { no: "3", time: "08:00" },
  { no: "4", time: "08:25" },
  { no: "5", time: "09:10" },
  { no: "6", time: "06:55" },
  { no: "7", time: "07:20" },
];

export default function Home() {
const [mode, setMode] = useState<"view" | "setting">("view");
const [shiftTable, setShiftTable] = useState<ShiftItem[]>(defaultTable);
const [selectedNo, setSelectedNo] = useState("1");
const [workDate, setWorkDate] = useState("");
const [isAdmin, setIsAdmin] = useState(false);
const ADMIN_PASSWORD = "1234";
const [notifyEnabled, setNotifyEnabled] = useState(false);
const [notifyTime, setNotifyTime] = useState("21:00");
useEffect(() => {
  setIsAdmin(window.location.search.includes("admin=1"));

  const savedTable = localStorage.getItem("shiftTable");
  const savedDate = localStorage.getItem("workDate");
  const savedShift = localStorage.getItem("selectedNo");
  const savedNotifyEnabled = localStorage.getItem("notifyEnabled");
const savedNotifyTime = localStorage.getItem("notifyTime");

  if (savedTable) setShiftTable(JSON.parse(savedTable));
  if (savedDate) setWorkDate(savedDate);
  if (savedShift) setSelectedNo(savedShift);
  if (savedNotifyEnabled) setNotifyEnabled(savedNotifyEnabled === "true");
if (savedNotifyTime) setNotifyTime(savedNotifyTime);
}, []);


  const selectedShift = shiftTable.find((item) => item.no === selectedNo);

   const testNotification = async () => {
  if (!("Notification" in window)) {
    alert("このブラウザは通知に対応していません");
    return;
  }

  let permission = Notification.permission;

  if (permission === "default") {
    permission = await Notification.requestPermission();
  }

  if (permission !== "granted") {
    alert("通知が許可されていません");
    return;
  }

  new Notification("勤務確認テスト", {
    body: `勤務番号: ${selectedNo}`,
  });
};
const saveAll = () => {
  localStorage.setItem("shiftTable", JSON.stringify(shiftTable));
  localStorage.setItem("workDate", workDate);
  localStorage.setItem("selectedNo", selectedNo);
  localStorage.setItem("notifyEnabled", String(notifyEnabled));
localStorage.setItem("notifyTime", notifyTime);

  alert("保存しました");
};

const importCsv = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    const text = e.target?.result as string;

    const rows = text.split("\n");

    const imported = rows
      .slice(1)
      .filter((row) => row.trim())
      .map((row) => {
        const [no, time] = row.split(",");

        return {
          no: no?.trim() || "",
          time: time?.trim() || "",
        };
      });

    setShiftTable(imported);
  };

  reader.readAsText(file);
};

  return (
    <div style={{ padding: 30, maxWidth: 600, margin: "0 auto" }}>
      {mode === "view" && (
        <>
          <h1>勤務確認アプリ</h1>

          <div style={{ marginTop: 30 }}>
            <div>次回出勤日</div>
            <input
  type="date"
  value={workDate}
  onChange={(e) => setWorkDate(e.target.value)}
  style={{
    fontSize: 28,
    padding: 12,
    width: "100%",
    fontWeight: "bold",
  }}
/>
          </div>

          <div style={{ marginTop: 30 }}>
            <div>勤務番号</div>
            <select
              value={selectedNo}
              onChange={(e) => setSelectedNo(e.target.value)}
              style={{ fontSize: 28, padding: 10, width: "100%" }}
            >
              {shiftTable.map((item, index) => (
                <option key={index} value={item.no}>
                  {item.no || "未入力"}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: 30 }}>
            <div>出勤時間</div>
            <div style={{ fontSize: 56, fontWeight: "bold" }}>
              {selectedShift?.time || "未設定"}
            </div>
          </div>

        <button
  onClick={saveAll}
  style={{
    marginTop: 30,
    width: "100%",
    padding: 15,
    fontSize: 20,
  }}
  >
保存
</button>
<div style={{ marginTop: 30 }}>
  <div>通知設定</div>
  <button
  onClick={testNotification}
  style={{
    marginTop: 10,
    width: "100%",
    padding: 12,
    fontSize: 18,
  }}
  >
  通知テスト
</button>

  <label style={{ display: "block", marginTop: 10, fontSize: 18 }}>
    <input
      type="checkbox"
      checked={notifyEnabled}
      onChange={(e) => setNotifyEnabled(e.target.checked)}
    />
    通知する
  </label>

  <input
    type="time"
    value={notifyTime}
    onChange={(e) => setNotifyTime(e.target.value)}
    style={{
      marginTop: 10,
      fontSize: 24,
      padding: 10,
      width: "100%",
    }}
  />
</div>
<button
  onClick={saveAll}
  style={{
    marginTop: 10,
    marginLeft: 10,
    padding: 10,
    fontSize: 18,
  }}
>
  保存
</button>

<button
  onClick={() => {
    const pass = prompt("管理者パスコードを入力してください");

    if (pass === ADMIN_PASSWORD) {
      setIsAdmin(true);
    } else if (pass !== null) {
      alert("パスコードが違います");
    }
  }}
  style={{
    marginTop: 20,
    width: "100%",
    padding: 10,
    fontSize: 14,
    opacity: 0.5,
  }}
>
  管理者モード
</button>

{isAdmin && (
  <button onClick={() => setMode("setting")}>
    ⚙️ 設定
  </button>
)}

</>
)}

{isAdmin && mode === "setting" && (
  <>
    <h1>設定</h1>

    <div style={{ marginTop: 20 }}>
      <div>次回出勤日</div>
      <input
        type="date"
        value={workDate}
        onChange={(e) => setWorkDate(e.target.value)}
        style={{ fontSize: 20, padding: 10, width: "100%" }}
      />
    </div>

    <hr style={{ margin: "30px 0" }} />

    <div style={{ marginBottom: 20 }}>
      <input type="file" accept=".csv" onChange={importCsv} />
    </div>

    <h2>対応表</h2>

    {shiftTable.map((item, index) => (
      <div
        key={index}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <input
          value={item.no}
          onChange={(e) => {
            const newTable = [...shiftTable];
            newTable[index] = { ...newTable[index], no: e.target.value };
            setShiftTable(newTable);
          }}
          placeholder="勤務番号"
          style={{ fontSize: 18, padding: 8 }}
        />

        <input
          value={item.time}
          onChange={(e) => {
            const newTable = [...shiftTable];
            newTable[index] = { ...newTable[index], time: e.target.value };
            setShiftTable(newTable);
          }}
          placeholder="出勤時間"
          style={{ fontSize: 18, padding: 8 }}
        />
      </div>
    ))}

    <button
      onClick={() => setShiftTable([...shiftTable, { no: "", time: "" }])}
      style={{ marginTop: 10, padding: 10, fontSize: 18 }}
    >
      行を追加
    </button>

    <button
      onClick={saveAll}
      style={{
        marginTop: 10,
        marginLeft: 10,
        padding: 10,
        fontSize: 18,
      }}
    >
      保存
    </button>

    <button
      onClick={() => setMode("view")}
      style={{
        marginTop: 30,
        width: "100%",
        padding: 15,
        fontSize: 20,
      }}
    >
      戻る
    </button>
  </>
)}
</div>
);
}