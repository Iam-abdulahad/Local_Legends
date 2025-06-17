import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const submitTestimonial = async ({ name, feedback, uid, email }) => {
  const testimonialRef = collection(db, "testimonials");

  // 🔍 Check if testimonial already exists for this user
  const q = query(testimonialRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    throw new Error("You have already submitted a review.");
  }

  // ✅ If not, add new testimonial
  await addDoc(testimonialRef, {
    name,
    feedback,
    uid,
    email,
    createdAt: serverTimestamp(),
  });
};
