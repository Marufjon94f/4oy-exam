
//=================================   Calling DOM elements  ============================================
let elUserList = $_(".js-first-list");
let elPostList = $_(".js-second-list");
let elCommentList = $_(".js-third-list");


//=================================   Calling Template Elements  ============================================
let elTemplateUserName = $_("#js-template-user").content;
let elTemplatePost = $_("#js-template-post").content;
let elTemplateComment = $_("#js-template-comment").content;




//*************************************  First Template function  ********************************************
// ***********************************************************************************************************
let elFragment = document.createDocumentFragment();

//=========================================   Fetching first  ====================================================
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => appendUserName(data));
  
//==============================================   Rendering  ====================================================
let userRender = (objects) => {
  let templateUser = elTemplateUserName.cloneNode(true);
  
//=================================   Matching text content from API  ============================================
  templateUser.querySelector(".template-user-name").textContent = objects.name;
  templateUser.querySelector(".template-user-username").textContent =
    objects.username;
  templateUser.querySelector(".template-user-email").textContent =
    objects.email;
  templateUser.querySelector(".template-user-street").textContent =
    objects.address.street;
  templateUser.querySelector(".template-user-suite").textContent =
    objects.address.suite;
  templateUser.querySelector(".template-user-city").textContent =
    objects.address.city;
  templateUser
    .querySelector(".user-btn")
    .value = objects.id;

  elFragment.appendChild(templateUser);
};

elUserList.innerHTML = "";

//=========================================   Appending function  ============================================
let appendUserName = (arr) => {
  arr.forEach((objects) => {
    userRender(objects);
  });
  elUserList.appendChild(elFragment);
};




//*************************************  Second Template function  ********************************************
// ***********************************************************************************************************

let asusFunction = (id) => {
  let elFragmentPost = document.createDocumentFragment();

//===============================================   Rendering  ====================================================
  let postRender = (obj) => {
    let templatePost = elTemplatePost.cloneNode(true);

//=================================   Matching text content from API  ============================================
    templatePost.querySelector(".template-post-title").textContent = obj.title;
    templatePost.querySelector(".template-post-body").textContent = obj.body;
    templatePost
      .querySelector(".post-btn")
      .value = obj.id;

    elFragmentPost.appendChild(templatePost);
  };

//===============================================   Appending function  ============================================
  let appendUserPost = (arrp) => {
    let acer = arrp.filter((elem) => elem.userId == id);
    acer.forEach((obj) => {
      postRender(obj);
    });
    elPostList.appendChild(elFragmentPost);
  };

//=============================================   Fetching second  ============================================
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => appendUserPost(data));
};
//=================================   Establishing info through click to window  =================================
elUserList.addEventListener("click", (el) => {
  
  if(el.target.className == "user-btn btn btn-warning"){
    elPostList.innerHTML = "";
  elCommentList.innerHTML = "";
  const userId = el.target.value;
  asusFunction(userId);
  }
  

  
});




//*************************************  Third Template function  ********************************************
// ***********************************************************************************************************

let lenovo = (idCom) => {
  let elFragmentComment = document.createDocumentFragment();

//===============================================   Rendering  ====================================================
  let commentRender = (objCom) => {
    let templateComment = elTemplateComment.cloneNode(true);

//=================================   Matching text content from API  ============================================
    templateComment.querySelector(".template-name").textContent = objCom.name;
    templateComment.querySelector(".template-comment-email").textContent =
      objCom.email;
    templateComment.querySelector(".template-comment-body").textContent =
      objCom.body;

    elFragmentComment.appendChild(templateComment);
  };

  //=======================================   Appending function  ============================================
  let appendUserComment = (arrCom) => {
    let lec = arrCom.filter((elCom) => elCom.postId == idCom);
    lec.forEach((objCom) => {
      commentRender(objCom);
    });
    elCommentList.appendChild(elFragmentComment);
  };

  //=================================   Fetching third  ========================================================
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((response) => response.json())
    .then((data) => appendUserComment(data));
};

//=================================   Establishing info through click to window  =================================
elPostList.addEventListener("click", (evt) => {
  if(evt.target.className == "post-btn btn btn-warning"){
    elCommentList.innerHTML = "";
  const postId = evt.target.value;
  lenovo(postId);
  }
  
});
