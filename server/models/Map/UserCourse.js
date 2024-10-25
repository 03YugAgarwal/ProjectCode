const mongoose = require("mongoose");

const userCourseSchema = mongoose.Schema({
  Users: [
    {
      type: String,
      required: true,
    },
  ],
  Course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});
const UserCourse = mongoose.model("UserCourseMap", userCourseSchema);
module.exports = { UserCourse };
