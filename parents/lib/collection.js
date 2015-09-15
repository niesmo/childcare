Parents = new Mongo.Collection('parents');

var Schemas = {};

Schemas.Parent = new SimpleSchema({
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
      label: "Date of Birth"
    },

    email: {
      type: SimpleSchema.RegEx.Email,
      label: "Email",
      max: 200
    },

    // TODO: if we need more than one phone number, we need to incorporate that
    phoneNumber: {
      type: String,
      label: "Phone Number",
      max:20
    },

    isPrimary: {
      type: Boolean,
      label: "Is Primary",
      optional: true
    },

    studentId: {
      type: SimpleSchema.RegEx.Id,
    },

    createdAt: {
        type: Date
    }
});

Parents.attachSchema(Schemas.Parent);