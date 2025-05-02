"use strict";

//======================================================validation on name
export function validatePersonName(input) {
  const errorElement = input.nextElementSibling;
  const value = input.value.trim();
  
  if (!value) {
    errorElement.textContent = "Person name is required";
    return false;
  } else if (value.length < 3) {
    errorElement.textContent = "Person name must be at least 3 characters";
    return false;
  } else if (value.length > 20) {
    errorElement.textContent = "Person name must be less than 20 characters";
    return false;
  } else {
    errorElement.textContent = "";
    return true;
  }

}

//===================================================== validation workout date 
export function validateWorkoutDate(input) {
  const errorElement = input.nextElementSibling;
  const value = input.value;
  
  if (!value) {
    errorElement.textContent = "Date is required";
    return false;
  } else if (isNaN(new Date(value).getTime())) {
    errorElement.textContent = "Please enter a valid date";
    return false;
  } else {
    errorElement.textContent = "";
    return true;
  }
}
//===================================================== validation workouttype

export function validateWorkoutType(input) {
    console.log(input+" validateworkoutyle ")
    
    if (!input) return false;
    const errorElement = input.nextElementSibling;
    if (!errorElement) return false;
    
    const value = input.value;
    console.log(value)
    
    if (!value) {
        errorElement.textContent = "Please select a workout type";
        return false;
    } else {
        errorElement.textContent = "";
        return true;
    }
}
//===================================================== validation  workout duration

export function validateWorkoutDuration(input) {
    console.log(input+" validateworkout  duration ")
    if (!input) return false;
    
    const errorElement = input.nextElementSibling;
    const value = input.value.trim();
    
    if (!value) {
        errorElement.textContent = "Duration is required";
        return false;
    } else if (isNaN(value) || Number(value) <= 0) {
    errorElement.textContent = "Duration must be a positive number";
    return false;
} else {
    errorElement.textContent = "";
    return true;
}
}
//===================================================== validation  workoutcalories burned

export function validateCaloriesBurned(input) {
    console.log(input+" validateworkout  caloreis ")
    if (!input) return false;
  const errorElement = input.nextElementSibling;
  const value = input.value.trim();
  
  if (!value) {
    errorElement.textContent = "Calories burned is required";
    return false;
  } else if (isNaN(value) || Number(value) <= 0) {
    errorElement.textContent = "Calories burned must be a positive number";
    return false;
  } else {
    errorElement.textContent = "";
    return true;
  }
}

// ================================================= checking and passing input value in object form
export function validateForm(fieldValidators) {
  let isValid = true;
  
  fieldValidators.forEach(({ field, checkValication }) => {
    // for input value of inputfield checkValication and combine results
    const fieldValid = checkValication(field);
    isValid = isValid && fieldValid;
  });
  
  return isValid;
}