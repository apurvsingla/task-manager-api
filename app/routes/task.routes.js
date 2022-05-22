const { authJwt } = require("../middleware");

module.exports = app => {
    app.use((req, res, next) => {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    const task = require("../controllers/task.controller.js");
  
    // var router = require("express").Router();
  
    // Create a new Task
    app.post("/api/v1/task", task.create);
  
    // Retrieve all task
    app.get("/api/v1/task", [authJwt.verifyToken], task.userChecklist);

    // Retrieve a single Task with id
    // router.get("/:id", task.findOne);
  
    // Update a Task with id
    app.put("/api/v1/task", [authJwt.verifyToken], task.update);
  
    // Delete a Task with id
    app.delete("/api/v1/task/:id", task.delete);

    //find task
    app.get("/api/v1/getTask", task.findAll);

    //fetch All tasks
    app.get("/api/v1/task/fetchAll", task.fetchAll);
  
    // app.use('/api/task', router);
};