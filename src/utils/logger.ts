import { db } from "../firebase";
import { collection, doc, addDoc, getDoc } from "firebase/firestore";

export const logSelectionData = async function (
  userId: string | undefined,
  mode: string,
  currentIndex: number,
  currentStoryName: string,
  rightSelection: string,
  selection: string | null,
  reason: string
) {
  try {
    const docRef = await addDoc(collection(db, "userSelections"), {
      prolificId: userId,
      mode: mode,
      currentIndex: currentIndex,
      story: currentStoryName,
      rightSelection: rightSelection,
      selection: selection,
      reason: reason,
      timestamp: new Date(),
    });
    console.log("User selection recorded with ID: ", docRef.id);
  } catch (error) {
    console.error("Error recording user selection: ", error);
  }
};

export const logTimeData = async function (
  userId: string | undefined,
  mode: string,
  story: string,
  index: number
) {
  try {
    const docRef = await addDoc(collection(db, "userTime"), {
      prolificId: userId,
      mode: mode,
      story: story,
      index: index,
      timestamp: new Date(),
    });
    console.log("User time recorded with ID: ", docRef.id);
  } catch (error) {
    console.error("Error recording user time: ", error);
  }
};

// try {
//   const userDoc = doc(db, "users", prolificId);
//   const userSnapshot = await getDoc(userDoc);

//   if (userSnapshot.exists()) {
//     navigate(modeConfig["repeatVisit"].nextPath);
//     onLogin(prolificId);
//   } else {
//     await setDoc(userDoc, { prolificId });
//     navigate(modeConfig["firstVisit"].nextPath);
//     onLogin(prolificId);
//   }
// } catch (error) {
//   console.log(error);
// }
// };

// function to return true or false if user exists in database
export const checkIfUserExists = async function (userId: string) {
  try {
    const userDoc = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDoc);
    return userSnapshot.exists();
  } catch (error) {
    console.log(error);
  }
};
