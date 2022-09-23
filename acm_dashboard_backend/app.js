


switch (q) {
  case 'login':
      login();
      break;
  case 'register':
      register();
      break;
  case 'update':
      update();
      break;
  case 'resetPassword':
      resetPassword();
      break;
  case 'fetchUserDoc':
      fetchUserDoc();
      break;
  case 'createBlog':
      createBlog();
      break;
  case 'updateBlog':
     updateBlog();
     break;
  case 'deleteBlog':
     deleteBlog();
     break;
  case 'allBlogs':
     fetchUserBlogs();
     break;
  case 'singleBlog':
     fetchSingleBlog();
     break;
  case 'allEvents':
     fetchAllEvents();
     break;
  case 'singleEvent':
     fetchSingleEvent();
     break;
  case 'checkRegisteredStudents':
     checkRegisteredStudents();
     break;
  case 'postDetailDashboard':
     postDetailDashboard();
     break;
  case 'formResponseCheck()':
    formResponseCheck();
    break;
  default:
    console.log("Invalid Query!");
}
