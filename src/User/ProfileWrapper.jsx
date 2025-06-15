import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import ProfileUpdatePage from "./ProfileUpdatePage";

const ProfileWrapper = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData({ uid: user.uid, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!userData) return <p className="text-center mt-10 text-red-500">User not found</p>;

  return <ProfileUpdatePage userData={userData} />;
};

export default ProfileWrapper;
