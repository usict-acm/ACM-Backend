const express = require("express");
const mysql = require("mysql");
//function blogInit (){}
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "acmbackend",
});

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("mysql connected");
  }
});
const app = express();
// function blogInit() {
//   database = new Database();
//   db = database.connect();
//   blog = new Blog(db);
//   return blog;
// }
// function createBlog() {
//   app.post("/createBlog", (req, res) =>
//     db.query("SELECT * FROM blogs", function (err, results) {
//       if (!err) {
//         blog = blogInit();
//         if (
//           req["blogTitle"] &&
//           req["userEmail"] &&
//           req["userName"] &&
//           req["content"] &&
//           req["coverImage"]
//         ) {
//           result = blog.createBlog(req);
//           if (result) {
//             allBlogs = blog.fetchAllBlogs(req["userEmail"]);
//             allBlogsArr = [];
//             if (allBlogs.num_rows > 0) {
//               while ((row = allBlogs.fetch_assoc())) {
//                 blogRow = {
//                   blogId: row["blogId"],
//                   blogTitle: row["blogTitle"],
//                   coverImage: row["coverImage"],
//                   content: row["content"],
//                   userEmail: row["userEmail"],
//                   userName: row["userName"],
//                   isDraft: boolval(row["isDraft"]),
//                   tags: unserialize(row["tags"]),
//                   created: row["created"],
//                   published: row["published"],
//                   lastUpdated: row["lastUpdated"],
//                   approved: boolval(row["approved"]),
//                 };
//                 allBlogsArr.push(blogRow);
//               }
//             }
//           }

//           //res.send(results);
//         }
//       } else {
//         //console.log(err);
//         console.log("Cannot post " + " /createBlog");
//       }
//     })
//   );
// }
app.post("/createBlog", (req, res) =>
  db.query("SELECT * FROM blogs", function (err, results) {
    if (!err) {
      var sql =
        "INSERT INTO blogs (userEmail, userName, blogTitle, coverImage, content, tags, isDraft, approved) VALUES ( 'gauranshi03@gmail.com', 'gauranshi', 'Blog1','','this is first blog')";
      db.query(sql, function (err, result) {
        if (err) throw err;
        //console.log("1 record inserted");
        res.send(result);
      });
    } else {
      //console.log(err);
      console.log("Cannot post " + " /createBlog");
    }
  })
);
app.post("/blogs", (req, res) => {
  db.query("SELECT * FROM blogs", function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    res.send(result);
  });
});
app.post("/singleBlog/:blogId", function (req, res) {
  const blogId = req.params.blogId;

  if (isNaN(Number(blogId))) {
    return res.status(400).json({ err: "Number only, please!" });
  }

  db.query(
    `SELECT * FROM blogs WHERE blogId = ?`,
    [blogId],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/updateBlog", (req, res) => {
  var sql =
    "UPDATE blogs SET blogTitle = 'Updated Title' WHERE userEmail = 'gauranshi3@gmail.com'";
  db.query(sql, function (err, result) {
    if (err) throw err;
    //console.log(result.affectedRows + " record(s) updated");
    res.send(result);
  });
});
app.listen("3000", function () {
  console.log("Server started on port 3000.");
});
