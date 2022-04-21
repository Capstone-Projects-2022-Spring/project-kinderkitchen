import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { getDatabase, get, ref, child } from "firebase/database";
import { getAuth } from "firebase/auth";

import Achievement from "../Components/Achievment";

const AchievementScreen = () => {
  const database = getDatabase();
  const dbRef = ref(database); //refrences Root database

  const auth = getAuth();
  const [currentUserID, setCurrentUserID] = useState(auth.currentUser.uid);

  const [achievementData, setAchievmentData] = useState(null);
  const [donationCount, setDonationCount] = useState(0);
  const [recipeCount, setRecipeCount] = useState(0);
  useEffect(() => {
    getAchievementData();
  }, []);

  function getAchievementData() {
    get(child(ref(database), `users/${currentUserID}/achievementData`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDonationCount(snapshot.val().donationsCompleted);
          setRecipeCount(snapshot.val().recipesCompleted);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <Achievement
        donationCount={donationCount}
        recipesCompleted={recipeCount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AchievementScreen;
