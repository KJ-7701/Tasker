const TaskContainer = document.querySelector(".task_container");
// console.log(TaskContainer);

let GlobalStorage = [];

// HTML Code
const NewCard = ({
  id,
  imageUrl,
  taskTitle,
  taskType,
  taskDescription,
}) => `<div class="col-md-6 col-lg-4" id=${id}>   <!-- helping in making a card visible by filling the information such as id, imageUrl-->
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success rounded" onclick="EditCard.apply(this, arguments)">
      <i class="fas fa-pencil-alt" onclick="EditCard.apply(this, arguments)"></i>
    </button>
    <button type="button" class="btn id=${id} btn-outline-danger rounded" onclick="DeleteCard.apply(this, arguments)">
      <i class="fas fa-trash-alt" onclick="DeleteCard.apply(this, arguments)" id=${id}></i>
    </button>
  </div>
  <img
    src= ${imageUrl}
    alt="Image"
  />
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">
     ${taskDescription}
    </p>
    <span class="badge bg-primary">${taskType}</span>
  </div>
  <div class="card-footer text-muted">
    <button
      type="button"
      id=${id}
      class="btn btn-outline-primary rounded-pill"
    >
      Open Task
    </button>
  </div>
</div>
</div>`;

// LOAD cards
const LoadInitialTaskData = () => {
  //ACCESS local storage
  // const InitialTaskData = localStorage.getItem("Tasker"); // Option 1
  const InitialTaskData = localStorage.Tasker; // Option 2

  if (!InitialTaskData) return; // do nothing if NULL value and return

  //Convert stringified-object to object
  const { cards_info } = JSON.parse(InitialTaskData);

  // Map around the array to generate HTML card and insert it into DOM
  cards_info.map((cardObject) => {
    const CreateNewCard = NewCard(cardObject);
    TaskContainer.insertAdjacentHTML("beforeend", CreateNewCard);
    GlobalStorage.push(cardObject);
  });
};

const UpdateLocalStorage = () => {
  localStorage.setItem("Tasker", JSON.stringify({ cards_info: GlobalStorage }));
};

// Function containing Object for storing inputted data
const SaveChanges = () => {
  const TaskData = {
    id: `${Date.now()}`, // Generates Unique Number for card ID
    imageUrl: document.getElementById("image_url").value,
    taskTitle: document.getElementById("task_title").value,
    taskType: document.getElementById("task_type").value,
    taskDescription: document.getElementById("task_description").value,
  };

  const CreateNewCard = NewCard(TaskData); // Storing the data into a constant

  TaskContainer.insertAdjacentHTML("beforeend", CreateNewCard); // Outputing the inputted data into the html document
  GlobalStorage.push(TaskData); // Storing TaskData inside GlobalStorage
  console.log(GlobalStorage);

  // ADD to local storage // Can use localStorage or sessionStorage (case Sensitive)
  UpdateLocalStorage();
};

const DeleteCard = (event) => {
  //id
  event = window.event;
  const TargetID = event.target.id;
  const tagname = event.target.tagName;

  //Search GlobalStorage, remove the object with the same id
  GlobalStorage = GlobalStorage.filter(
    (cardObject) => cardObject.id !== TargetID
  );

  UpdateLocalStorage();
  // NewUpdatedArray.map((cardObject) => {
  //   const CreateNewCard = NewCard(cardObject);
  //   TaskContainer.insertAdjacentHTML("beforeend", CreateNewCard);
  // });

  // Access DOM to remove them

  if (tagname == "BUTTON") {
    // // TASK Container OPTION 1
    // return event.target.parentNode.parentNode.parentNode.parentNode.removeChild(
    //   event.target.parentNode.parentNode.parentNode
    // );

    //TASK Container OPTION 2
    return TaskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  }

  // // TASK Container OPTION 1
  // return event.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
  //   event.target.parentNode.parentNode.parentNode.parentNode
  // );
  // TASK Container OPTION 2
  return TaskContainer.removeChild(
    event.target.parentNode.parentNode.parentNode.parentNode
  );
};

const EditCard = (event) => {
  event = window.event;
  const TargetID = event.target.id;
  const tagname = event.target.tagName;

  let parentElement;

  if (tagname == "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  let taskTitle = parentElement.childNodes[5].childNodes[1];
  let taskDescription = parentElement.childNodes[5].childNodes[3];
  let taskType = parentElement.childNodes[5].childNodes[5];
  let submitButton = parentElement.childNodes[7].childNodes[1];

  // setAttribute
  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.setAttribute(
    "onclick",
    "saveEditChanges.apply(this, arguments)"
  );
  submitButton.innerHTML = "Save Changes";
};

const saveEditChanges = (event) => {
  event = window.event;
  const TargetID = event.target.id;
  const tagname = event.target.tagName;

  let parentElement;

  if (tagname == "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  let taskTitle = parentElement.childNodes[5].childNodes[1];
  let taskDescription = parentElement.childNodes[5].childNodes[3];
  let taskType = parentElement.childNodes[5].childNodes[5];

  let submitButton = parentElement.childNodes[7].childNodes[1];

  const updatedData = {
    taskTitle: taskTitle.innerHTML,
    taskDescription: taskDescription.innerHTML,
    taskType: taskType.innerHTML,
  };

  console.log(updatedData);

  GlobalStorage = GlobalStorage.map((task) => {
    if (task.id === TargetID) {
      return {
        id: task.id,

        imageUrl: task.imageUrl,
        taskTitle: updatedData.taskTitle,
        taskType: updatedData.taskType,
        taskDescription: updatedData.taskDescription,
      };
    }
    return task; // IMPORTANT
  });
  UpdateLocalStorage();
  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  submitButton.removeAttribute("onclick");
  submitButton.innerHTML = "Open Task";
};
