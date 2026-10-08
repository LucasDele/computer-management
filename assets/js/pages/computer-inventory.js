// Exports the function so it can be used in other JavaScript files.
export const computerInventory = () => {
  // Displays a welcome message in the console.
  console.log("Welcome!");

  // Gets the button used to add a new computer.
  const addComputerBtn = document.getElementById("addComputerBtn");

  // Gets the button used to close the computer form.
  const closeComputerBtn = document.getElementById("closeComputerBtn");

  // Gets the toolbar element from the page.
  const toolbar = document.getElementById("toolbar");

  // Gets the inventory table element from the page.
  const inventoryTable = document.getElementById("inventoryTable");

  // Gets the computer form element from the page.
  const computerForm = document.getElementById("computerForm");

  // Creates a function that shows the computer form.
  const showForm = () => {
    // Hides the toolbar from the page.
    toolbar.classList.replace("d-flex", "d-none");

    // Hides the inventory table from the page.
    inventoryTable.classList.replace("d-flex", "d-none");

    // Shows the computer form on the page.
    computerForm.classList.replace("d-none", "d-flex");
  };

  // Creates a function that hides the computer form.
  const hideForm = () => {
    // Shows the toolbar on the page.
    toolbar.classList.replace("d-none", "d-flex");

    // Shows the inventory table on the page.
    inventoryTable.classList.replace("d-none", "d-flex");

    // Hides the computer form from the page.
    computerForm.classList.replace("d-flex", "d-none");
  };

  // Adds a click event to the add computer button.
  addComputerBtn.addEventListener("click", (event) => {
    // Prevents the button from performing its default action.
    event.preventDefault();

    // Calls the function that shows the computer form.
    showForm();
  });

  // Adds a click event to the close computer button.
  closeComputerBtn.addEventListener("click", (event) => {
    // Prevents the button from performing its default action.
    event.preventDefault();

    // Calls the function that hides the computer form.
    hideForm();
  });
};

// Runs the computer inventory function.
computerInventory();
