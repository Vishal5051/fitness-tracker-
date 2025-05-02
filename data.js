"use strict";

// ===========================================================storage
export let workoutsList = JSON.parse(localStorage.getItem("workoutsList")) || [];
console.log(workoutsList)

export let deleteIndex = null;

export function setDeleteIndex(i) {
  deleteIndex = i;
}

//=========================================================================add modal 
export const personName = document.querySelector("#personName");
export const workoutDate = document.querySelector("#workoutDate");
export const addWorkoutRowAddModal = document.querySelector("#addWorkoutRowAddModal");
export const workoutType = document.querySelector("#workoutType");
export const workoutDuration = document.querySelector("#workoutDuration");
export const caloriesBurned = document.querySelector("#caloriesBurned");
// caloriesBurned.style.color='red'

////=========================================================================edit modal 
export const editPersonName = document.querySelector("#editPersonName");
export const editWorkoutDate = document.querySelector("#editWorkoutDate");
export const addWorkoutRowEditMOdal = document.querySelector("#addWorkoutRowEditMOdal");
// editPersonName.style.color='blue'
export const editWorkoutType = document.querySelector("#editWorkoutType");
export const editWorkoutDuration = document.querySelector("#editWorkoutDuration");
export const editCaloriesBurned = document.querySelector("#editCaloriesBurned");

//=========================================================================input and buttons
export const addWorkoutForm = document.getElementById("addWorkoutForm");
export const editForm = document.getElementById("editForm");
export const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
export const searchInput = document.getElementById("searchInput");
export const rowIndexOfEditModal = document.getElementById("editIndex");
export const addWorkoutBtn = document.querySelector("#addWorkoutBtn");
export const updateWorkoutBtn = document.querySelector("#updateWorkout");
export const tableViewBtn = document.querySelector("#tableViewBtn");
export const cardViewBtn = document.querySelector("#cardViewBtn");
export const tableView = document.getElementById("tableView");
export const cardView = document.getElementById("cardView");