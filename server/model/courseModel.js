const { Schema, model } = require("mongoose");
const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    coverImage: {
      filename: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    },
    videos: {
      type: Array,
      default: [],
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "Volunteer",
    },
    enrol: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const CourseModel = model("course", courseSchema);

module.exports = CourseModel;
