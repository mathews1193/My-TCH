import React, { useState, useEffect } from 'react';
import Recipe from './Recipe';
import firebase from '../firebase';

export default function RecipeList() {
  const [recipeList, setRecipeList] = useState();

  useEffect(() => {
    const recipeRef = firebase.database().ref('Recipes');
    recipeRef.on('value', (snapshot) => {
      const recipeLists = snapshot.val();
      const recipeList = [];
      for (let id in recipeLists) {
        recipeList.push({ id, ...recipeLists[id] });
      }
      setRecipeList(recipeList);
    });
  }, []);

  return (
    <div>
      {recipeList
        ? recipeList.map((recipeList, index) => <Recipe recipeList={recipeList} key={index} />)
        : ''}
    </div>
  );
}