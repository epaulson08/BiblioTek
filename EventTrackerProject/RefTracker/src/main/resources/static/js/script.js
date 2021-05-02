window.addEventListener("load", function (e) {
  console.log("******* script.js loaded *******");

  countAllArticles(e);
  loadJournals(e);

  init();
});

function init() {
  // Create event listeners:

  // READ: Find all articles
  let seeAllBtn = document.getElementById("seeAllBtn");
  seeAllBtn.addEventListener("click", loadArticles);

  // READ: Find article by Id
  let findArticleByIdBtn = document.getElementById("findArticleByIdBtn");
  findArticleByIdBtn.addEventListener("click", findArticleById);

  // CREATE:
  let createArticleBtn = document.getElementById("createArticleBtn");
  createArticleBtn.addEventListener("click", createArticle);

  // UPDATE:
  let updateArticleBtn = document.getElementById("updateArticleBtn");
  updateArticleBtn.addEventListener("click", updateArticle);

  // DELETE:
  let deleteArticleBtn = document.getElementById("deleteArticleBtn");
  deleteArticleBtn.addEventListener("click", deleteArticle);
}

//////// READ
// (This is invoked on load event)
//// Count All Articles
let countAllArticles = function (e) {
  e.preventDefault();

  let xhr = new XMLHttpRequest();

  xhr.open("GET", "api/articles/aggregates/count");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let count = xhr.responseText;
        displayCount(count, countDiv);
      } else {
        console.log("Error retrieving count: " + xhr.status);
      }
    }
  };

  xhr.send();
};

//// Find All Journals
// (This is invoked on load event to populate dropdown menus)
let loadJournals = function (e) {
  e.preventDefault();

  let xhr = new XMLHttpRequest();

  xhr.open("GET", "api/journals");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let journals = JSON.parse(xhr.responseText);
        displayJournalDropDown(journals);
      } else {
        console.log("Error retrieving journals: " + xhr.status);
        displayError("There was a problem retrieving your articles!");
      }
    }
  };

  xhr.send();
};

//// Find All Articles
let loadArticles = function (e) {
  e.preventDefault();
  let whereToDisplay = document.getElementById("allArticles");

  let xhr = new XMLHttpRequest();

  xhr.open("GET", "api/articles");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let articles = JSON.parse(xhr.responseText);
        displayArticles(articles, whereToDisplay);
      } else {
        displayError(
          "Error retrieving articles: " + xhr.status,
          whereToDisplay
        );
      }
    }
  };

  xhr.send();
};

//// Find Article By ID
let findArticleById = function (e) {
  e.preventDefault();

  let id = findArticleByIdForm.id.value;
  let whereToDisplay = document.getElementById("articleByIdOutput");

  let xhr = new XMLHttpRequest();
  xhr.open("GET", "api/articles/" + id);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let article = JSON.parse(xhr.responseText);
        console.log("article title in findArticleById(): " + article.title);
        displayArticle(article, whereToDisplay);
      } else {
        displayError(
          "Error retrieving articles: " + xhr.status,
          whereToDisplay
        );
      }
    }
  };

  xhr.send();
};

//////// CREATE
let createArticle = function (e) {
  e.preventDefault();

  userAuthor = {
    firstName: createArticleForm.firstName.value,
    middleName: createArticleForm.middleName.value,
    lastName: createArticleForm.lastName.value,
    suffix: createArticleForm.suffix.value,
  };

  userArticle = {
    title: createArticleForm.title.value,
    volumeNum: createArticleForm.volNum.value,
    yearPublished: createArticleForm.yrPub.value,
    doi: createArticleForm.doi.value,
    journal: { id: createArticleForm.chooseJournal.value },
  };

  payload = {
    author: userAuthor,
    ja: userArticle,
  };

  postPayload(payload);
};

let postPayload = function (payload) {
  // payload will contain Article and Author objects

  let whereToDisplay = document.getElementById("createArticleOutput");

  let xhr = new XMLHttpRequest();

  xhr.open("POST", "api/articles");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status == 200 || xhr.status == 201) {
        let payloadObj = JSON.parse(xhr.responseText);
        console.log(payloadObj);
        whereToDisplay.textContent = "Success!";
        // TODO: extract article from payload and display
        // displayArticle(article, whereToDisplay)
      } else {
        console.log("POST request failed.");
        console.error(xhr.status + ": " + xhr.responseText);
        displayError();
      }
    }
  };

  xhr.setRequestHeader("Content-type", "application/json");
  var payloadJson = JSON.stringify(payload);

  xhr.send(payloadJson);
};

// let addAuthor = function(articleId, authorId) {
//   console.log("DEBUG: in addAuthor()");

//   var xhr = new XMLHttpRequest();
//   xhr.open("PUT", "api/articles/" + articleId + "/authors/" + authorId);
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//       if (xhr.status == 200 || xhr.status == 201) {
//         var data = JSON.parse(xhr.responseText);
//         console.log(data);
//       } else {
//         console.log("PUT request failed.");
//         console.error(xhr.status + ": " + xhr.responseText);
//       }
//     }
//   };
//   // xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body
//   // var userArticleJson = JSON.stringify(userArticle); // Convert JS object to JSON string
//   xhr.send(articleId, authorId);
// }

//////// UPDATE
let updateArticle = function (e) {
  e.preventDefault();

  userArticle = {
    id: updateArticleForm.id.value,
    title: updateArticleForm.title.value,
    volumeNum: updateArticleForm.volNum.value,
    yearPublished: updateArticleForm.yrPub.value,
    doi: updateArticleForm.doi.value,
    journal: { id: updateArticleForm.chooseJournalUpdate.value },
  };

  putArticle(userArticle);
};

let putArticle = function (userArticle) {
  var xhr = new XMLHttpRequest();

  xhr.open("PUT", "api/articles/" + userArticle.id);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status == 200 || xhr.status == 201) {
        var data = JSON.parse(xhr.responseText);
        console.log(data);
      } else {
        console.log("PUT request failed.");
        console.error(xhr.status + ": " + xhr.responseText);
      }
    }
  };

  xhr.setRequestHeader("Content-type", "application/json");
  var userArticleJson = JSON.stringify(userArticle);

  xhr.send(userArticleJson);
};

//////// DELETE
let deleteArticle = function (e) {
  e.preventDefault();

  let id = deleteArticleForm.id.value;
  let delOutput = document.getElementById("deleteArticleOutput");

  let xhr = new XMLHttpRequest();

  xhr.open("DELETE", "api/articles/" + id);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 204) {
        let msg = "Deleted article with ID " + id;
        displayMessage(msg, delOutput);
      } else {
        displayError("Error deleting article: " + xhr.status, delOutput);
      }
    }
  };

  xhr.send(id);
};

//////// DISPLAY UTILITIES
function displayMessage(msg, whereToDisplay) {
  whereToDisplay.textContent = "";

  let writeMe = document.createElement("h4");
  writeMe.textContent = msg;

  whereToDisplay.appendChild(writeMe);
}

function displayError(msg, whereToDisplay) {
  whereToDisplay.textContent = "";

  let writeMe = document.createElement("p");
  writeMe.textContent = msg;

  whereToDisplay.appendChild(writeMe);
}

function displayCount(count, whereToDisplay) {
  whereToDisplay.textContent = "";

  let writeMe = document.createElement("p");
  writeMe.textContent = "Total articles in your collection: " + count;

  whereToDisplay.appendChild(writeMe);
}

function displayArticle(article, whereToDisplay) {
  whereToDisplay.textContent = "";

  let writeMe = document.createElement("p");
  writeMe.textContent = "ID: " + article.id + "Title: " + article.title;

  whereToDisplay.appendChild(writeMe);
}

function displayArticles(articles, whereToDisplay) {
  whereToDisplay.textContent = "";

  var divULArticles = document.createElement("ul");

  for (let i = 0; i < articles.length; i++) {
    var liArticle = document.createElement("li");
    article = articles[i];
    liArticle.textContent = "ID: " + article.id + "   Title: " + article.title;
    divULArticles.appendChild(liArticle);
  }

  whereToDisplay.appendChild(divULArticles);
}

function displayJournalDropDown(journals) {
  let journalDropDown = document.getElementById("chooseJournal");
  let journalDropDownUpdate = document.getElementById("chooseJournalUpdate");

  journalDropDown.textContent = "";
  journalDropDownUpdate.textContent = "";

  for (let i = 0; i < journals.length; i++) {
    // For each journal add an element to both the create and update
    // dropdown menus
    let dropdownItemA = document.createElement("option");
    let dropdownItemB = document.createElement("option");

    journal = journals[i];

    dropdownItemA.textContent = journal.name;
    dropdownItemA.value = journal.id;

    dropdownItemB.textContent = journal.name;
    dropdownItemB.value = journal.id;

    journalDropDown.appendChild(dropdownItemA);
    journalDropDownUpdate.appendChild(dropdownItemB);
  }
}

// DEPRECATED FUNCTIONS:

// function postAuthor(userAuthor, idReturnObject) {
//
//   let xhr = new XMLHttpRequest();
//
//   xhr.open("POST", "api/authors");
//   xhr.onreadystatechange = function (idReturnObject) {
//     if (xhr.readyState === 4) {
//       if (xhr.status == 200 || xhr.status == 201) {
//         let authorObj = JSON.parse(xhr.responseText);
//         console.log(authorObj);
//         let authorId = authorObj.id;
//         idReturnObject.authorId = authorId;
//         console.log("DEBUG: authorId = " + authorId);
//       } else {
//         console.log("POST request failed.");
//         console.error(xhr.status + ": " + xhr.responseText);
//       }
//     }
//   };
//   xhr.setRequestHeader("Content-type", "application/json");
//   var userAuthorJson = JSON.stringify(userAuthor);
//   xhr.send(userAuthorJson);
// }

// function postArticle(article) {
//   console.log("DEBUG: in postArticle()");
//
//   let xhr = new XMLHttpRequest();
//
//   xhr.open("POST", "api/articles");
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//       if (xhr.status == 200 || xhr.status == 201) {
//         let articleObj = JSON.parse(xhr.responseText);
//         console.log(articleObj);
//       } else {
//         console.log("POST request failed.");
//         console.error(xhr.status + ": " + xhr.responseText);
//       }
//     }
//   };
//   xhr.setRequestHeader("Content-type", "application/json");
//   var articleJson = JSON.stringify(article);
//   xhr.send(articleJson);
// }

// function echoAuthor(author) {
// 	console.log("DEBUG: in echoAuthor()");
//
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", "api/articles/echo");
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//       if (xhr.status == 200 || xhr.status == 201) {
//         var data = JSON.parse(xhr.responseText);
//         console.log(data);
//       } else {
//         console.log("PUT request failed.");
//         console.error(xhr.status + ": " + xhr.responseText);
//       }
//     }
//   };
//   xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body
//   var articleJson = JSON.stringify(article); // Convert JS object to JSON string
//   xhr.send(articleJson);
// }
