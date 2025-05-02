"use strict";

import {
  personName,
  workoutDate,
  workoutType,
  addWorkoutRowAddModal,
  workoutDuration,
  caloriesBurned,
  editForm,
  confirmDeleteBtn,
  searchInput,
  addWorkoutBtn,
  tableViewBtn,
  cardViewBtn,
  tableView,
  cardView,
  editPersonName,
  editWorkoutDate,
  editWorkoutType,
  addWorkoutRowEditMOdal,
  editWorkoutDuration,
  editCaloriesBurned,
} from "./data.js";

import {
  fetchWorkouts,
  addWorkout,
  searchWorkouts,
  deleteWorkout,
  prepareDelete,
  populateEditForm,
  updateWorkout,
  toggleView
} from "./utilities.js";

import {
  validatePersonName,
  validateWorkoutDate,
  validateWorkoutType,
  validateWorkoutDuration,
  validateCaloriesBurned,
} from "./validation.js";

//////////////////////////////////////////////////////////////////////////////////////
//   ===================================================on page load
////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  // ===================================================fetching workouts from localStorage
  fetchWorkouts();
  // ===================================================first row of the add modal cross hiding
  const firstRowCloseBtn = document.querySelector(
    "#workoutRowsContainer .row button"
  );
  if (firstRowCloseBtn) firstRowCloseBtn.style.display = "none";
  // ===================================================set default active view
  tableViewBtn.classList.add("active");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
// ===========================================================================View toggle
//////////////////////////////////////////////////////////////////////////////////////////////////////
tableViewBtn.addEventListener("click", () => toggleView("table"));
cardViewBtn.addEventListener("click", () => toggleView("card"));


//////////////////////////////////////////////////////////////////////////////////////////////////////
//========================================================================= add workout to the localstorage
//////////////////////////////////////////////////////////////////////////////////////////////////////
addWorkoutBtn.addEventListener("click", addWorkout);

//////////////////////////////////////////////////////////////////////////////////////////////////////
//=========================================================================ading multiple workout activites
//////////////////////////////////////////////////////////////////////////////////////////////////////
document
  .getElementById("workoutRowsContainer")
  .addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.textContent.trim() === "X") {
      const row = e.target.closest(".row");
      console.log(row + " rows of  workout  ");

      const allRows = document.querySelectorAll("#workoutRowsContainer .row");
      if (allRows.length > 1) {
        row.remove();
      }
    }
  });

addWorkoutRowAddModal.addEventListener("click", () => {
  const container = document.getElementById("workoutRowsContainer");
  const firstRow = container.querySelector(".row");
  const newRow = firstRow.cloneNode(true);
  newRow
    .querySelectorAll("input, select")
    .forEach((input) => (input.value = ""));
  newRow
    .querySelectorAll(".errorMessage")
    .forEach((el) => (el.textContent = ""));
  const closeBtn = newRow.querySelector("button");
  closeBtn.style.display = "inline-block";

  container.appendChild(newRow);
});
//   ============================================== for edit modal
document
  .getElementById("editWorkoutRowsContainer")
  .addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.textContent.trim() === "X") {
      const row = e.target.closest(".row");
      console.log(row + " rows of  workout  ");

      const allRows = document.querySelectorAll(
        "#editWorkoutRowsContainer .row"
      );
      if (allRows.length > 1) {
        row.remove();
      }
    }
  });
addWorkoutRowEditMOdal.addEventListener("click", () => {
  const container = document.getElementById("editWorkoutRowsContainer");
  const firstRow = container.querySelector(".row");
  const newRow = firstRow.cloneNode(true);
  newRow
    .querySelectorAll("input, select")
    .forEach((input) => (input.value = ""));
  newRow
    .querySelectorAll(".errorMessage")
    .forEach((el) => (el.textContent = ""));
  const closeBtn = newRow.querySelector("button");
  closeBtn.style.display = "inline-block";

  container.appendChild(newRow);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
//================================================opening the modal for edit or delte workout data.
//////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("click", function (e) {
  // opening the edit modal for perticular index
  if (e.target.closest(".edit-btn")) {
    const button = e.target.closest(".edit-btn");
    const index = button.dataset.index;
    console.log(index + " edit modal  ");
    populateEditForm(index); 
  }
  //  opening the delte moodal and passing index 
  if (e.target.closest(".delete-btn")) {
    const button = e.target.closest(".delete-btn");
    const index = button.dataset.index;
    console.log(index + " delte modal  ");
    prepareDelete(index);
  }

});

//////////////////////////////////////////////////////////////////////////////////////////////////////
//================================================updating the edit modal
//////////////////////////////////////////////////////////////////////////////////////////////////////
editForm.addEventListener("submit", updateWorkout);

// /////////////////////////////////////////////////////////////
//  ============================================delete the workout details
// /////////////////////////////////////////////////////////////
confirmDeleteBtn.addEventListener("click", deleteWorkout);
// /////////////////////////////////////////////////////////////
//  ============================================searching on the all inputs fields
// /////////////////////////////////////////////////////////////
searchInput.addEventListener("input", searchWorkouts);

// /////////////////////////////////////////////////////////////
//  ============================================avalidation on the input file of add workout
// /////////////////////////////////////////////////////////////

personName.addEventListener("blur", () => {
  validatePersonName(personName);
});

workoutDate.addEventListener("change", () => {
  validateWorkoutDate(workoutDate);
});
workoutType.addEventListener("change", () => {
  validateWorkoutType(workoutType);
});
workoutDuration.addEventListener("change", () => {
  validateWorkoutDuration(workoutDuration);
});

caloriesBurned.addEventListener("change", () => {
  validateCaloriesBurned(caloriesBurned);
});
// /////////////////////////////////////////////////////////////
//  ============================================avlidation on the input file of add workout
// /////////////////////////////////////////////////////////////
editPersonName.addEventListener("blur", () =>
  validatePersonName(editPersonName)
);
editWorkoutDate.addEventListener("change", () =>
  validateWorkoutDate(editWorkoutDate)
);
editWorkoutType.addEventListener("change", () =>
  validateWorkoutType(editWorkoutType)
);
editWorkoutDuration.addEventListener("change", () =>
  validateWorkoutDuration(editWorkoutDuration)
);
editCaloriesBurned.addEventListener("change", () =>
  validateCaloriesBurned(editCaloriesBurned)
);
