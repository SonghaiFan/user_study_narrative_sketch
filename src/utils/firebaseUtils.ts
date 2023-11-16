import { db } from "../firebase";
import { ref, push, set, get, serverTimestamp } from "firebase/database";

export const logUserSelectionData = async (
  userId: string,
  mode: string,
  currentIndex: number,
  currentStoryName: string,
  rightSelection: string,
  selection: string | null,
  reason: string,
  decision: string
) => {
  const selectionData = {
    mode,
    currentIndex,
    story: currentStoryName,
    rightSelection,
    selection,
    reason,
    decision,
    timestamp: serverTimestamp(),
  };

  const dbRef = push(ref(db, `${userId}/userSelections`));

  try {
    await set(dbRef, selectionData);
    console.log("User selection recorded with ID: ", dbRef.key);
  } catch (error) {
    console.error("Error recording user selection: ", error);
  }
};

export async function checkUserExists(userId: string) {
  const userRef = ref(db, `${userId}`);
  const userSnapshot = await get(userRef);
  return userSnapshot.exists();
}

export async function createUser(userId: string) {
  const userRef = ref(db, `${userId}`);
  await set(userRef, { userId });
}

export async function logRoutePathNavigation(
  userId: string,
  routePath: string
) {
  const routePathData = {
    routePath,
    timestamp: serverTimestamp(),
  };

  const dbRef = push(ref(db, `${userId}/routePathNavigation`));

  try {
    await set(dbRef, routePathData);
    console.log("Route path navigation recorded with ID: ", dbRef.key);
  } catch (error) {
    console.error("Error recording route path navigation: ", error);
  }
}
