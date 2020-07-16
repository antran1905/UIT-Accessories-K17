var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { collection: "contact" }
);

contactSchema.path("name").set(function (input) {
  return input[0].toUpperCase() + input.slice(1);
});

module.exports = mongoose.model("Contact", contactSchema);
