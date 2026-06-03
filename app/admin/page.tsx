"use client";

import AddShiftPattern from "../../components/AddShiftPattern";
import ShiftPatternList from "../../components/ShiftPatternList";

export default function AdminPage() {
  return (
    <div>
      <h1>管理者ページ</h1>
      <AddShiftPattern />
      <ShiftPatternList />
    </div>
  );
}
