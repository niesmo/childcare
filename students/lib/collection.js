Students = new Mongo.Collection('students');

var Schemas = {};

Schemas.Student = new SimpleSchema({
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

    /**
     * status would can only be values of
     * 1. "WAITLIST"
     * 2. "APPLICATION"
     * 3. "ENROLLED"
     */
    status:{
      type: String,
      label: "Status"
    },

    /**
     * order will capture the order of the student in the current waitlist
     */
    order:{
      type: Number,
      label: "Order",
      optional: true
    },

    /**
     * type will only get the values of
     * 1. REGULAR   ->  First time students
     * 2. MEMBER    ->  Student of a member of the organization
     * 3. EXISTING  ->  Already a member student (their parent have another student here)
     */
    type: {
      type: String,
      label: "Type"
    },

    classId:{
      type: SimpleSchema.RegEx.Id,
      optional: true
    },

    createdAt: {
      type: Date
    },
});

Students.attachSchema(Schemas.Student);