Teachers = new Mongo.Collection('teachers');

var Schemas = {};

Schemas.Teacher = new SimpleSchema({
    firstName: {
        type: String,
        label: "First Name",
        max: 45
    },
    middleName: {
        type: String,
        label: "Middle Name",
        max: 45,
        optional: true
    },
    lastName: {
        type: String,
        label: "Last Name",
        max: 45
    },

    dateOfBirth: {
      type: Date,
      label: "Date of Birth",
      optional: true
    },

    email: {
      type: SimpleSchema.RegEx.Email,
      label: "Email",
      max: 200,
      optional: true
    },

    // TODO: if we need more than one phone number, we need to incorporate that
    phoneNumber: {
      type: String,
      label: "Phone Number",
      max:20,
      optional: true
    },

    createdAt: {
        type: Date
    }
});

Teachers.attachSchema(Schemas.Teacher);