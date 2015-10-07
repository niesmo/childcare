Parents = new Mongo.Collection('parents');
StudentParents = new Mongo.Collection('studentParents');

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
    label: "Date of Birth",
    optional:true
  },

  address:{
    type: String,
    label: "Address",
  },

  image:{
    type: SimpleSchema.RegEx.Url,
    label: "Image",
    optional: true
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

  createdAt: {
    type: Date,
    autoform:{
      omit: true
    }
  }
});

// Many to Many relationship between parent and student
Schemas.StudentParent = new SimpleSchema({
  parentId:{
    type: SimpleSchema.RegEx.Id
  },
  studentId:{
    type: SimpleSchema.RegEx.Id
  },

  isPrimary: {
    type: Boolean,
    label: "Is Primary",
    optional: true
  }
});

Parents.attachSchema(Schemas.Parent);
StudentParents.attachSchema(Schemas.StudentParent);