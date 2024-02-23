// Function to display questions and options with pagination
function displayQuestions(subjects, currentSubject, page, pageSize) {
  const quizContainer = document.getElementById("quiz");
  const checkboxesContainer = document.getElementById("checkboxes");
  const paginationContainer = document.getElementById("pagination");

  // Clear previous questions, checkboxes, and pagination
  quizContainer.innerHTML = "";
  checkboxesContainer.innerHTML = "";
  paginationContainer.innerHTML = "";

  subjects.forEach((subject) => {
    if (subject.subject === currentSubject) {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const questions = subject.questions.slice(startIndex, endIndex);

      questions.forEach((q, index) => {
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");
        questionElement.innerHTML = `<p>${(page - 1) * pageSize + index + 1}. ${q.question}</p>`;

        // Create an unordered list for options
        const optionsList = document.createElement("ul");

        // Loop through options
        q.options.forEach((opt, optIndex) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${opt.option}`;
          listItem.addEventListener("click", () => {
            // Check if selected option is correct or not
            if (opt.is_correct) {
              listItem.classList.add("correct");
              showAnswer(questionElement, q.answer);
            } else {
              listItem.classList.add("incorrect");
            }
            // Disable further option selection
            disableOptions(questionElement);
          });

          optionsList.appendChild(listItem);
        });

        questionElement.appendChild(optionsList);

        // Display the answer with a toggle button
        const answerElement = document.createElement("div");
        answerElement.innerHTML = `<div class="Explanation"> 
                                       <p class="green"> Answer: </p>
                                       <p class="green"> Explanation:</p>                        
                                       ${q.answer}  </div>`;
        answerElement.style.fontWeight = "bold";
        answerElement.classList.add("answer"); // Add 'answer' class to hide by default
        questionElement.appendChild(answerElement);

        const toggleButton = document.createElement("div");
        toggleButton.innerHTML = `<span class="material-symbols-outlined">description</span>`;
        toggleButton.classList.add("toggle-button"); // Add 'toggle-button' class for styling
        toggleButton.addEventListener("click", () => {
          answerElement.classList.toggle("shown");
        });
        questionElement.appendChild(toggleButton);

        quizContainer.appendChild(questionElement);
      });

      // Add pagination buttons
      const totalPages = Math.ceil(subject.questions.length / pageSize);
      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.addEventListener("click", () => {
          displayQuestions(subjects, currentSubject, i, pageSize);
          // Scroll to the top of the page
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationContainer.appendChild(pageButton);
      }
    }
  });

  // Create checkboxes to switch subjects
  subjects.forEach((subject) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox_${subject.subject}`;
    checkbox.checked = subject.subject === currentSubject;
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        // Update the URL hash to indicate the selected subject
        window.location.hash = subject.subject;
        displayQuestions(subjects, subject.subject, 1, pageSize);
        // Remove 'active' class from all checkboxes
        checkboxesContainer
          .querySelectorAll('input[type="checkbox"]')
          .forEach((cb) => {
            cb.classList.remove("active");
          });
        // Add 'active' class to the clicked checkbox
        checkbox.classList.add("active");
      }
    });

    const label = document.createElement("label");
    label.setAttribute("for", `checkbox_${subject.subject}`);
    label.textContent = subject.subject;

    checkboxesContainer.appendChild(checkbox);
    checkboxesContainer.appendChild(label);
  });
}

// Fetch JSON data
fetch("../resources/questions.json") // Assuming questions.json is in the same directory
  .then((response) => response.json())
  .then((data) => {
    // Use the first subject as the default subject
    const defaultSubject = data[0].subject;
    
    // Check if the URL hash indicates a specific subject
    const hash = window.location.hash.substring(1);
    const currentSubject = hash ? hash : defaultSubject;
    
    displayQuestions(data, currentSubject, 1, 5); // Default pageSize is 5
  })
  .catch((error) => console.error("Error fetching JSON:", error));

// Disable further option selection after selecting an option
function disableOptions(questionElement) {
  const listItems = questionElement.querySelectorAll("li");
  listItems.forEach((item) => {
    item.removeEventListener("click", () => { /* Replace handleOptionSelection with the inline function */ });
  });
}

// Show answer function
function showAnswer(questionElement, answer) {
  const answerElement = questionElement.querySelector(".answer");
  answerElement.innerHTML = `<div class="Explanation"> 
                                       <p class="green"> Answer: </p>
                                       <p class="green"> Explanation:</p>                        
                                       ${answer}  </div>`;
  answerElement.classList.add("shown");
}
