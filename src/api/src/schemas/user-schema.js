const yup = require("yup")
const timeStampSchema = require("./time-stamp-schema")
const isUUID = require("validator/lib/isUUID")

const userSchema = yup
  .object()
  .shape({
    id: yup.string().test({
      name: "id",
      message: "${path} must be uuid", // eslint-disable-line
      test: value => (value ? isUUID(value) : true),
    }),

    password: yup.string().when("$validatePassword", {
      is: true,
      then: yup
        .string()
        .required()
        .min(8)
        .max(30),
    }),

    username: yup
      .string()
      .required()
      .max(30)
      .default("")
      .trim(),

  })
  .noUnknown()
  .concat(timeStampSchema)

module.exports = userSchema
