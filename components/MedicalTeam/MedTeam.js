import React from 'react';
import firebase from '../firebase';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

toast.configure();

export default function MedTeam({ medTeamList }) {
  
  const deleteItem = () => {
    const medTeamRef = firebase.database().ref('MedTeam').child(MedTeamList.id);
    recipeRef.remove();
    toast(MedTeamList.staffName + " was removed successful.");
  };

  const itemStatus = () => {
    const recipeRef = firebase.database().ref('Recipes').child(recipeList.id);
    recipeRef.update({
      complete: !recipeList.complete,
      recipeListStatus: "Found",
    });
    toast(recipeList.recipeName + " has been found!");
  };
  return (
    <div className="shoppingList">
      <div className={recipeList.complete ? 'complete' : ''}>
        <p>{medTeamList.staffName}</p>
        <p>Category: {recipeList.category}</p>
        <p>{recipeList.amount} {recipeList.unit} {recipeList.item}</p> 
        <h3>Instructions</h3>
        <p>{recipeList.instructions}</p>
      </div>
      <div className="btn-ud"> 
        <button className="complete" onClick={itemStatus}>Complete</button>
        <button className="delete" onClick={deleteItem}>Delete</button>
      </div>
    </div>
  );
}