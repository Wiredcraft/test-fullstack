const yup = require("yup")
const timeStampSchema = require("./time-stamp-schema")
const isUUID = require("validator/lib/isUUID")

const votingSchema = yup
  .object()
  .shape({
    id: yup.string().test({
      name: "id",
      message: "${path} must be uuid", // eslint-disable-line
      test: value => (value ? isUUID(value) : true),
    }),
    articleid:  yup
      .string()
      .required(),
    authorid:  yup
      .string()
      .required(),

  })
  .noUnknown()
  .concat(timeStampSchema)

module.exports = votingSchema
