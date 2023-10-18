import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { Story } from "../components/data/types";

export const logData = async function (
  userId: string | undefined,
  mode: string,
  currentStory: Story,
  rightSelection: string,
  selection: string | null,
  reason: string
) {
  try {
    const docRef = await addDoc(collection(db, "userSelections"), {
      prolificId: userId,
      mode: mode,
      story: currentStory.name,
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
