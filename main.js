// Находим элементы по классам
const addButton = document.querySelector(".add-task-btn");
const inputTask = document.querySelector(".add-task-input");
const taskInbox = document.querySelector(".task-inbox");
const NoTask = document.querySelector(".notask");

// Добавляем обработчик события клика на кнопку
addButton.addEventListener("click", () => {
  // Получаем значение текста из поля ввода
  const taskTitle = inputTask.value;

  // Проверяем, чтобы поле ввода не было пустым
  if (taskTitle.trim() === "") {
    alert("Введите задачу!");
    return;
  }

  // Создаем новый элемент div с классом .task-cart
  const newTask = document.createElement("div");
  newTask.className = "task-cart";

  const addSubtaskButton = document.createElement("button");
  addSubtaskButton.classList.add("add-subtask");

  // Вставляем HTML код задачи в новый элемент
  newTask.innerHTML = `
    <div class="cart-top">
      <textarea rows="1" cols="2" placeholder="Big Task" class="cart-title">${taskTitle}</textarea>
      <div class="progress-percent">0%</div>
    </div>
    <div id="createdDate" class="date-cart">${getCurrentDate()}</div>
    <progress id="progressBar" class="progress-bar" value="0" max="100"></progress>
    <div class="subtask-inbox">
    
    </div>
    <div class="cart-bottom">
    <button class="add-subtask"><span>+</span>New Task</button>
    <div class="cart-button">
    <button class="delete-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
    <circle cx="17" cy="17" r="16.5" stroke="#B3B3B3"/>
    <path d="M25.3571 11.8681H8.64286C8.28286 11.8681 8 11.5852 8 11.2252C8 10.8652 8.28286 10.5823 8.64286 10.5823H25.3571C25.7171 10.5823 26 10.8652 26 11.2252C26 11.5852 25.7171 11.8681 25.3571 11.8681Z" fill="#B3B3B3"/>
    <path d="M20.8829 11.6231L20.3172 9.74732C20.2775 9.61431 20.1961 9.49756 20.085 9.41429C19.9739 9.33101 19.839 9.28562 19.7001 9.28479H14.3001C14.161 9.28479 14.0256 9.32988 13.9144 9.41327C13.8031 9.49667 13.7219 9.61388 13.6829 9.74732L13.1172 11.6231L11.8829 11.2505L12.4486 9.37473C12.6929 8.55246 13.4386 8 14.3001 8H19.7001C20.5615 8 21.2944 8.55246 21.5515 9.37473L22.1172 11.2505L20.8829 11.6231Z" fill="#B3B3B3"/>
    <path d="M21.5386 26H12.4614C11.42 26 10.5714 25.1777 10.5328 24.1371L10.0957 11.4561L11.3814 11.4176L11.8186 24.0985C11.8186 24.4454 12.1143 24.7152 12.4614 24.7152H21.5514C21.8986 24.7152 22.1814 24.4454 22.1943 24.0985L22.6314 11.4176L23.9171 11.4561L23.48 24.1371C23.4414 25.1777 22.5928 26 21.5514 26H21.5386Z" fill="#B3B3B3"/>
    <path d="M15.0713 21.6574C14.7113 21.6574 14.4285 21.3747 14.4285 21.015V15.8758C14.4285 15.5161 14.7113 15.2334 15.0713 15.2334C15.4313 15.2334 15.7142 15.5161 15.7142 15.8758V21.015C15.7142 21.3747 15.4313 21.6574 15.0713 21.6574ZM18.9285 21.6574C18.5685 21.6574 18.2856 21.3747 18.2856 21.015V15.8758C18.2856 15.5161 18.5685 15.2334 18.9285 15.2334C19.2885 15.2334 19.5713 15.5161 19.5713 15.8758V21.015C19.5713 21.3747 19.2885 21.6574 18.9285 21.6574Z" fill="#B3B3B3"/>
    </svg>
    </button>
    </div>
    </div>
    `;

  // Вставляем созданный элемент в список задач
  taskInbox.appendChild(newTask);

  // Удаляем Notask
  NoTask.style.display = "none";

  // Очищаем поле ввода
  inputTask.value = "";
});

// Функция для получения текущей даты в формате "ДД.ММ.ГГГГ"
function getCurrentDate() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  return `${day}.${month}.${year}`;
}

// Находим все кнопки "Добавить подзадачу"

// Добавляем обработчик события клика на родительский элемент
taskInbox.addEventListener("click", (event) => {
  const targetElement = event.target;

  // const taskDeleteBtns = document.querySelectorAll(".delete-btn");
  const taskDelete = document.querySelectorAll(".delete-btn");

  taskDelete.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const parent = e.target.closest(".task-cart");
      parent.remove();
      if (parent) {
        parent.remove();
        // Проверяем, есть ли еще карточки .task-cart
        const remainingTaskCarts = document.querySelectorAll(".task-cart");
        if (remainingTaskCarts.length === 0) {
          // Если карточек нет, показываем элемент .notask
          NoTask.style.display = "flex";
        }
      }
    });
  });

  // Проверяем, что клик был на кнопке .add-subtask
  if (targetElement.classList.contains("add-subtask")) {
    // Находим родительскую карточку .task-cart
    const taskCart = targetElement.closest(".task-cart");

    // Проверяем, что нашли карточку
    if (taskCart) {
      // Создаем новую подзадачу внутри карточки
      const subtask = document.createElement("label");
      subtask.className = "checkbox subtask";
      subtask.innerHTML = `
      <input type="checkbox" />
      <div class="checkbox-checkmark"></div>
      <textarea class="checkbox-body" cols="40" rows="1" placeholder="text"></textarea>
      `;

      subtask.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        // Удаляем элемент из DOM
        subtask.remove();
      });

      // Находим область для вставки подзадач в карточке
      const subtaskInbox = taskCart.querySelector(".subtask-inbox");
      subtaskInbox.appendChild(subtask);

      const newSubtaskTextarea = subtask.querySelector(".checkbox-body");

      // Фокусируемся на textarea для того, чтобы пользователь мог сразу же вводить текст
      newSubtaskTextarea.focus();
    }
  }
});

// Обработчик события для изменения состояния checkbox'ов
taskInbox.addEventListener("change", (event) => {
  const targetElement = event.target;

  // Проверяем, что клик был на checkbox'е
  if (targetElement.type === "checkbox") {
    // Находим родительскую карточку .task-cart
    const taskCart = targetElement.closest(".task-cart");

    // Проверяем, что нашли карточку
    if (taskCart) {
      // Находим все checkbox'ы внутри карточки
      const checkboxes = taskCart.querySelectorAll('input[type="checkbox"]');

      // Подсчитываем количество отмеченных checkbox'ов
      const checkedCount = [...checkboxes].filter(
        (checkbox) => checkbox.checked
      ).length;

      // Обновляем progress-bar основной задачи
      updateProgressBar(taskCart, checkboxes.length, checkedCount);
    }
  }
});

// Функция для обновления progress-bar основной задачи
function updateProgressBar(taskCart, totalSubtasks, checkedSubtasks) {
  const progressBar = taskCart.querySelector(".progress-bar");
  const progressPercent = taskCart.querySelector(".progress-percent");

  // Вычисляем процент выполнения основной задачи
  const completionPercentage = (checkedSubtasks / totalSubtasks) * 100;

  // Обновляем значения progress-bar и текста процента
  progressBar.value = completionPercentage;
  progressPercent.textContent = `${completionPercentage.toFixed(0)}%`;
}
