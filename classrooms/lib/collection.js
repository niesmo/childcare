Classrooms = new Mongo.Collection('classrooms');

var Schemas = {};

Schemas.Classroom = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 45
  },

  /**
   * type will only get the values of
   * 1. TODDLER   ->  First time students
   * 2. INFANT    ->  Student of a member of the organization
   */
  type: {
    type: String,
    label: "Type",
    allowedValues: ['TODDLER', 'INFANT'],
    autoform:{
      options:[
        {label:"Toddler", value: "TODDLER"},
        {label:"Infant", value: "INFANT"}
      ]
    }
  },

  capacity: {
    type: Number,
    label: "Capacity",
    optional: true
  },

  teacherId: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
    autoform:{
      omit: true
    }
  },

  createdAt: {
    type: Date,
    autoform:{
      omit: true
    }
  }
});

Classrooms.attachSchema(Schemas.Classroom);