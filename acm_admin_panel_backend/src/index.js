import "dotenv/config";
import express from 'express';
import joinUsRoutes from './routes/joinUsRoutes.js';
import contactUsRoutes from './routes/contactUsRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import linkRoutes from './routes/linkRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import db from './database.js';
import errorMiddleware from "./middleware/error.middleware.js";

db.connect(function(err) {
    if (err) {
        console.log(err);
        console.log("Cannot connect to mysql exiting now!");
        process.exit(2);
    } else {
        console.log("mysql connected");
    }
});

const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(joinUsRoutes);
app.use(contactUsRoutes);
app.use(teamRoutes);
app.use(announcementRoutes);
app.use(linkRoutes);
app.use(blogRoutes);
// for better error handling
app.use(errorMiddleware);
//
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
