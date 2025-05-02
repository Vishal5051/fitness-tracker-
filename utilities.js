"use strict";

import {
  validatePersonName,
  validateWorkoutDate,
  validateWorkoutType,
  validateWorkoutDuration,
  validateCaloriesBurned,
  validateForm,
} from "./validation.js";

import {
  workoutsList,
  personName,
  workoutDate,
  addWorkoutForm,
  deleteIndex,
  setDeleteIndex,
  searchInput,
  rowIndexOfEditModal,
  cardView,
  editPersonName,
  editWorkoutDate,
} from "./data.js";
//////////////////////////////////////////////////////////////////////////////////
// ==============================================================Toast implimentation
//////////////////////////////////////////////////////////////////////////////////

export function showToast(message, type = "success") {
  const toastContainer =
    document.getElementById("toastContainer") || createToastContainer();
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-white bg-${type} border-0 mb-2`;
  toast.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      `;
  toastContainer.appendChild(toast);
  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();
  toast.addEventListener("hidden.bs.toast", () => toast.remove());
}

function createToastContainer() {
  const container = document.createElement("div");
  container.id = "toastContainer";
  container.className = "toast-container position-fixed bottom-0 end-0 p-3";
  document.body.appendChild(container);
  return container;
}

//////////////////////////////////////////////////////////////////////////////////
// ===========================================Fetch workouts from localStorage
//////////////////////////////////////////////////////////////////////////////////
export function fetchWorkouts(list = workoutsList) {
  const tbody = document.querySelector("#workoutList");
  tbody.innerHTML = "";

  cardView.innerHTML = "";

  list.forEach((workout, index) => {
    // creating a table  row
    const row = document.createElement("tr");
    // console.log(typeof(workout.workoutType)+ (" ") + workout.workoutType)
    // let worktypearrya =workout.workoutType;
    //  worktypearrya.join(", ")

    const { name, date, workoutType, duration, calories } = workout;

    let typeList = Array.isArray(workoutType) ? workoutType : [workoutType];

    function arrayToWordSet(arr) {
      const wordSet = new Set();
      for (const str of arr) {
        const words = str.split(/\s+/);
        for (const word of words) {
          wordSet.add(word);
        }
      }
      return wordSet;
    }
    typeList = arrayToWordSet(typeList);
    console.log(typeList);

    let typeDisplay = [...typeList];
    typeDisplay = typeDisplay.join(",  ");

    //  typeDisplay =

    let totalDuration = Array.isArray(duration) ? duration : [duration];
    totalDuration = totalDuration
      .map(Number)
      .reduce((acc, val) => acc + (isNaN(val) ? 0 : val), 0);

    let totalCalories = Array.isArray(calories) ? calories : [calories];
    totalCalories = totalCalories
      .map(Number)
      .reduce((acc, val) => acc + (isNaN(val) ? 0 : val), 0);

    row.innerHTML = `
      <td>${workout.name}</td>
      <td>${workout.date}</td>
      <td>
        <span class=" rounded-pill ">
          ${typeDisplay}
        </span>
      </td>
      <td>${totalDuration}</td>
      <td>${totalCalories}</td>
      <td>
       <button class="btn me-1 edit-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#editModal">
          <svg xmlns="http://www.w3.org/2000/svg" style="color: rgb(0, 0, 0);" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg>
        </button>

        <button class="btn me-1 delete-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#deleteModal">
          <svg xmlns="http://www.w3.org/2000/svg" style="color: rgb(201, 24, 24);" width="25" height="25" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
          </svg>
        </button> 

       
      </td>
    `;
    tbody.appendChild(row);

    const cardCol = document.createElement("div");
    cardCol.className = "col-md-4 col-lg-3";
    cardCol.innerHTML = `
    <div class="card shadow-sm rounded-4 border-0 position-relative h-100">
      <div class="position-absolute top-0 end-0 m-2">
        <button class="btn btn-sm  edit-btn mt-0 me-1" data-index="${index}" data-bs-toggle="modal" data-bs-target="#editModal" title="Edit">
          <i class="bi bi-pencil" style="color: black;" ></i>
        </button>
        <button class="btn btn-sm  delete-btn mt-0" data-index="${index}" data-bs-toggle="modal" data-bs-target="#deleteModal" title="Delete">
          <i class="bi bi-trash " style="color: black;"></i>
        </button>
      </div>
  
      <div class="card-body pt-4">
        <h6 class="text-primary fw-semibold mb-1">${workout.name}</h6>
        <h5 class="card-title fw-bold text-dark">${typeDisplay}</h5>
  
        <div class="d-flex justify-content-between align-items-center mt-4">
          <small class="text-muted">
            ${new Date(workout.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </small>
          <span class="badge bg-light text-dark border px-3 py-2">
            D - ${totalDuration}, C - ${totalCalories}
          </span>
        </div>
      </div>
    </div>
  `;

    cardView.appendChild(cardCol);
  });

  // ===============================================no data aviiable inthe loaclstorage
  if (list.length === 0) {
    // in table
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="6" class="text-center py-3">No workouts found</td>`;
    tbody.appendChild(row);
    
    // in cards
   
    const cardCol = document.createElement("div");
    cardCol.className = "col-12 text-center py-4";
    cardCol.innerHTML = `<h4>No workouts found</h4>`;
    cardView.appendChild(cardCol);
  }
}

//////////////////////////////////////////////////////////////////////////////////
// ==============================================================Toast implimentation
//////////////////////////////////////////////////////////////////////////////////

export function searchWorkouts() {
  const searchTerm = searchInput.value.toLowerCase();

  if (!searchTerm) {
    fetchWorkouts();
    return;
  }

  const filteredWorkouts = workoutsList.filter((workout) => {
    return (
      workout.name.toLowerCase().includes(searchTerm) ||
      workout.date.toString().includes(searchTerm) ||
      workout.workoutType.some((str) =>str.toLowerCase().includes(searchTerm)) ||
      workout.duration.toString().includes(searchTerm) ||
      workout.calories.toString().includes(searchTerm)
    );
  });

  fetchWorkouts(filteredWorkouts);
}

//////////////////////////////////////////////////////////////////////////////////
// ============================================================ Add a new workout to local stoarage
//////////////////////////////////////////////////////////////////////////////////
export function addWorkout(e) {
  e.preventDefault();
  console.log("adding");
  // =================constainer of the type , duration , calories

  const rows = document.querySelectorAll("#workoutRowsContainer .row");
  //   console.log(rows)
  const checkFormInput = validateForm([
    { field: personName, checkValication: validatePersonName },
    { field: workoutDate, checkValication: validateWorkoutDate },
  ]);
  let allValid = checkFormInput;
  // console.log(allValid)

  const workoutTypes = [];
  let totalDuration = [];
  let totalCalories = [];

  /////////////////////////////////////////////////////////////////////////////
  rows.forEach((row) => {
    const typeInput = row.querySelector(".workout-type");
    const durationInput = row.querySelector(".duration");
    const caloriesInput = row.querySelector(".calories");

    //    console.log(typeInput)

    const isValid = validateForm([
      { field: typeInput, checkValication: validateWorkoutType },
      { field: durationInput, checkValication: validateWorkoutDuration },
      { field: caloriesInput, checkValication: validateCaloriesBurned },
    ]);

    console.log(isValid);
    if (!isValid) {
      allValid = isValid;
      return;
    }
    workoutTypes.push(typeInput.value);
    totalDuration.push(durationInput.value);
    totalCalories.push(caloriesInput.value);

    //   let workoutTyleList = []
    //   rows.forEach((row) => {
    //     workoutTyleList.push(row.querySelector(".workout-type").value)
    //   })

    // console.log(workoutTyleList)
  });

  const workout = {
    name: personName.value.trim(),
    date: workoutDate.value,
    workoutType: workoutTypes,
    duration: totalDuration,
    calories: totalCalories,
  };
  //////////////////////////////////////////////////////////////////////
  if (!allValid) return;
  console.log(allValid);

  workoutsList.push(workout);
  localStorage.setItem("workoutsList", JSON.stringify(workoutsList));

  addWorkoutForm.reset();

  const addModal = bootstrap.Modal.getInstance(
    document.getElementById("workoutModal")
  );
  addModal.hide();
  showToast("Your Workout added successfully");
  fetchWorkouts();
}

export function populateEditForm(index) {
  const workout = workoutsList[index];
  rowIndexOfEditModal.value = index;

  // fetching date and name
  editWorkoutDate.value = workout.date;
  editPersonName.value = workout.name;

  const container = document.querySelector(
    "#editModal #editWorkoutRowsContainer"
  );
  container.innerHTML = "";

  const types = workout.workoutType;
  // console.log(typeof(types))

  const durations = workout.duration;
  const calories = workout.calories;

  for (let i = 0; i < types.length; i++) {
    const row = document.createElement("div");
    row.className = "row g-2 mb-3";

    row.innerHTML = `
        <div class="col-md-4">
          <select class="form-select editWorkout-type" >
            <option value="">Select Type</option>
            <option ${types[i] === "Running" ? "selected" : ""}>Running</option>
            <option ${types[i] === "Cycling" ? "selected" : ""}>Cycling</option>
            <option ${types[i] === "Yoga" ? "selected" : ""}>Yoga</option>
            <option ${
              types[i] === "Weightlifting" ? "selected" : ""
            }>Weightlifting</option>
          </select>
          <div class="errorMessage text-danger"></div>
        </div>
  
        <div class="col-md-3">
          <input type="number" class="form-control editDuration" value="${
            durations[i]
          }"    placeholder="Duration (min)"  />
          <div class="errorMessage text-danger"></div>
        </div>
  
        <div class="col-md-3">
          <input type="number" class="form-control editCalories" value="${
            calories[i]
          }"  placeholder="Calories Burned"  />
          <div class="errorMessage text-danger"></div>
        </div>
  
        <div class="col-md-2 d-flex justify-content-center align-items-center mt-2">
          <button type="button" class="btn btn-primary mt-0">X</button>
        </div>
      `;

    container.appendChild(row);
  }

  // Hide delete button on first row
  const firstX = container.querySelector(".btn-primary");
  if (firstX) firstX.style.display = "none";
}

export function updateWorkout(e) {
  e.preventDefault();

  const isValidA = validateForm([
    { field: editPersonName, checkValication: validatePersonName },
    { field: editWorkoutDate, checkValication: validateWorkoutDate },
  ]);
  if (!isValidA) {
    showToast("Fill all the detials first... ", "danger");

    return;
  }
  // =================constainer of the type , duration , calories
  const rows = document.querySelectorAll("#editWorkoutRowsContainer .row");
  //   console.log(rows)

  const workoutTypes = [];
  const durations = [];
  const calories = [];

  let allValid = true;

  rows.forEach((row) => {
    const typeInput = row.querySelector(".editWorkout-type");
    const durationInput = row.querySelector(".editDuration");
    const caloriesInput = row.querySelector(".editCalories");

    //    console.log(typeInput)

    const isRowValid = validateForm([
      { field: typeInput, checkValication: validateWorkoutType },
      { field: durationInput, checkValication: validateWorkoutDuration },
      { field: caloriesInput, checkValication: validateCaloriesBurned },
    ]);
    if (!isRowValid) {
      allValid = false;
      showToast("Fill all the detials first... ", "danger");
      return;
    }
    workoutTypes.push(typeInput.value);
    durations.push(durationInput.value);
    calories.push(caloriesInput.value);
  });
  if (!allValid) {
    showToast("Fill all the detials first... ", "danger");

    return;
  }
  showToast("Your Workout data is now updated.");
  const index = rowIndexOfEditModal.value;
  workoutsList[index] = {
    name: editPersonName.value.trim(),
    date: editWorkoutDate.value,
    workoutType: workoutTypes,
    duration: durations,
    calories: calories,
  };

  localStorage.setItem("workoutsList", JSON.stringify(workoutsList));

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("editModal")
  );
  modal.hide();
  showToast("Your Workout data is now updated.");
  fetchWorkouts();
}


export function toggleView(viewType) {
  if (viewType === "table") {
    tableView.style.display = "block";
    cardView.style.display = "none";
    tableViewBtn.classList.add("active");
    cardViewBtn.classList.remove("active");
  } else {
    tableView.style.display = "none";
    cardView.style.display = "flex";
    tableViewBtn.classList.remove("active");
    cardViewBtn.classList.add("active");
  }
}
//////////////////////////////////////////////////////////////////////////////////
// ============================================================ delete the workout functionss
//////////////////////////////////////////////////////////////////////////////////

export function prepareDelete(index) {
  setDeleteIndex(index);
  // const workout = workoutsList[index];
  // const deleteWarning = document.getElementById("deleteWarning");

  // const {name,date,workoutType,duration,calories } = workout;

  // let totalDuration = Array.isArray(duration) ? duration : [duration];
  // totalDuration = totalDuration.map(Number).reduce((acc, val) => acc + (isNaN(val) ? 0 : val), 0);
  // console.log(totalDuration)

  // if (totalDuration < 100) {
  //     showToast ("Warning: This workout exceeds 100 minutes duration.", "danger" );

  //   const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
  //   deleteModal.hide();
  //   console.log("helloooooooo")

  //   return;
  // }
}

export function deleteWorkout() {
  const workout = workoutsList[deleteIndex];
  const { name, date, workoutType, duration, calories } = workout;

  let totalDuration = Array.isArray(duration) ? duration : [duration];
  totalDuration = totalDuration
    .map(Number)
    .reduce((acc, val) => acc + (isNaN(val) ? 0 : val), 0);
  console.log(totalDuration);

  if (totalDuration < 100) {
    showToast("Warning: This workout exceeds 100 minutes duration.", "danger");

    const deleteModal = bootstrap.Modal.getInstance(
      document.getElementById("deleteModal")
    );
    deleteModal.hide();
    return;
  }

  // delte the specific index of arrry
  workoutsList.splice(deleteIndex, 1);

  localStorage.setItem("workoutsList", JSON.stringify(workoutsList));

  const deleteModal = bootstrap.Modal.getInstance(
    document.getElementById("deleteModal")
  );
  deleteModal.hide();
  showToast("Workout deleted Successfully");

  fetchWorkouts();
}
