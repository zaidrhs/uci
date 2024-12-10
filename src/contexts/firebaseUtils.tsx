// firebaseUtils.ts
import { getDatabase, ref, set, get } from "firebase/database";

// دالة لحفظ دور المستخدم في قاعدة البيانات
export const saveUserRole = async (userId: string, role: "ADMIN" | "USER") => {
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);
  try {
    await set(userRef, { role });
  } catch (error) {
    throw new Error("Failed to save user role");
  }
};

// دالة لاسترجاع دور المستخدم من قاعدة البيانات
export const fetchUserRole = async (userId: string): Promise<"ADMIN" | "USER"> => {
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    return snapshot.val().role || "USER";
  }
  return "USER"; // الدور الافتراضي
};
