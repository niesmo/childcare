Applications = new Mongo.Collection('application');

var Schemas = {};

Schemas.Application = new SimpleSchema({
  effectiveDate:{
    type: Date,
    label: "Effective Date"
  },

  expirationDate: {
    type: Date,
    label: "Expiration Date"
  },

  sentAt: {
    type: Date,
    label: "Sent At"
  },

  sentBy: {
    type: SimpleSchema.RegEx.Id,
    label: "Sent By"
  },

  /**
   * type will only get the values of
   * 1. REGULAR   ->  First time students
   * 2. MEMBER    ->  Student of a member of the organization
   * 3. EXISTING  ->  Already a member student (their parent have another student here)
   */
  type: {
    type: String,
    label: "Type",
    allowedValues: ['REGULAR', 'MEMBER', 'EXISTING'],
    autoform:{
      options:[
        {label: "Regular", value: "REGULAR"},
        {label: "Member", value: "MEMBER"},
        {label: "Existing", value: "EXISTING"}
      ],
      omit: true
    }
  }
});

Applications.attachSchema(Schemas.Application);