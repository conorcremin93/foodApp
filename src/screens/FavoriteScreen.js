import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();

  // Access favorite recipes from Redux state
  const favoriteRecipes = useSelector((state) => state.favorites);
  const favoriteRecipesList = favoriteRecipes?.favoriterecipes || [];

  if (favoriteRecipesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>
        {/* Go Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Text style={styles.goBackButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      {/* Heading */}
      <View testID="favoriteRecipes">
        <Text style={styles.heading}>My Favorite Recipes</Text>
      </View>

      {/* Go Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBackButton}
      >
        <Text style={styles.goBackButtonText}>Go back</Text>
      </TouchableOpacity>

      {/* List of Favorite Recipes */}
      <FlatList
        data={favoriteRecipesList}
        contentContainerStyle={styles.listContentContainer}
        keyExtractor={(item) => item.idFood}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => navigation.navigate("RecipeDetail", { ...item })}
          >
            {/* Recipe Image */}
            <Image source={{ uri: item.recipeImage }} style={styles.recipeImage} />

            {/* Recipe Title */}
            <View>
              <Text style={styles.recipeTitle}>
                {item.recipeName.length > 20
                  ? item.recipeName.slice(0, 20) + "..."
                  : item.recipeName}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: hp(2.5),
    color: "#6B7280", // text-neutral-600
  },
  goBackButton: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 100,
    alignItems: "center",
    alignSelf: "center",
  },
  goBackButtonText: {
    color: "#fff",
  },
  heading: {
    fontSize: hp(3.8),
    marginTop: hp(4),
    marginLeft: 20,
    fontWeight: "600",
    color: "#52525B",
  },
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  cardContainer: {
    backgroundColor: "white",
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: 10,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  recipeImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: 10,
    marginRight: wp(4),
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
  },
});
