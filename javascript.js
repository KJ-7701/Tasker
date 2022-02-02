const TaskContainer = document.querySelector(".task_container");
console.log(TaskContainer);

const NewCard = ({
  id,
  imageUrl,
  taskTitle,
  taskType,
  taskDescription,
}) => `<div class="col-md-6 col-lg-4" id=${id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success rounded">
      <i class="fas fa-pencil-alt"></i>
    </button>
    <button type="button" class="btn btn-outline-danger rounded">
      <i class="fas fa-trash-alt"></i>
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
      class="btn btn-outline-primary rounded-pill"
    >
      Open Task
    </button>
  </div>
</div>
</div>`;

const SaveChanges = () => {
  const TaskData = {
    id: `${Date.now()}`, // Generates Unique Number for card ID
    imageUrl: document.getElementById("image_url").value,
    taskTitle: document.getElementById("task_title").value,
    taskType: document.getElementById("task_type").value,
    taskDescription: document.getElementById("task_description").value,
  };

    const createNewCard = NewCard(TaskData);

    TaskContainer.insertAdjacentHTML("beforeend", createNewCard);
};