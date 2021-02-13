const express = require("express");
const router = express.Router();
const Excercise = require("../models/Excecise");
const { check, validationResult } = require("express-validator/check");
//Test Route
router.get("/test", (req, res) => {
  res.send("Test route : Exercises");
});
//@route  : "/"
//@access : Public
//@desc   : Get all the exercise list from the database

router.get("/", async (req, res) => {
  try {
    const ExerciseList = await Excercise.find({});
    if (ExerciseList.length === 0) {
      return res.status(404).json({ msg: "Exersice List is empty" });
    }

    return res.json({ ExerciseList });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

//@route  : "/"
//@access : Public
//@desc   : Create new exercise in the database
router.post(
  "/add",
  [
    check("username", "Please enter the valid username").not().isEmpty(),
    check("description", "Please enter the valid description").isLength({
      min: 2,
    }),
    check("duration", "Please enter the valid duration").not().isEmpty(),
    check("date", "Please enter the valid date").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { username, description, duration } = req.body;
      const date = Date.parse(req.body.date);

      const exercise = new Excercise({
        username,
        description,
        duration,
        date,
      });

      await exercise.save();
      return res.json({ msg: "New Exercise Added" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

//@route  : "/:id"
//@access : Public
//@desc   : Access the perticular exercise in the database

router.get("/:id", async (req, res) => {
  try {
    const exercise = await Excercise.findById(req.params.id);

    if (!exercise) {
      return res.json({ msg: "Id not present" });
    }

    return res.json({ exercise });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

//@route  : "/:id"
//@access : Public
//@desc   : Update the perticular exercise in the database

router.put("/update/:id", async (req, res) => {
  const { username, description, duration } = req.body;
  const date = Date.parse(req.body.date);

  const exercise = await Excercise.findByIdAndUpdate(req.params.id, {
    $set: { username, description, duration, date },
  });

  if (!exercise) {
    return res.json({ msg: "Exercise does not exist" });
  }
  return res.json({ msg: "Exercise updated" });
});

//@route  : "/:id"
//@access : Public
//@desc   : Delete the perticular exercise in the database

router.delete("/:id", async (req, res) => {
  try {
    await Excercise.findByIdAndDelete(req.params.id);
    return res.json({ msg: "Exercise deleted." });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
