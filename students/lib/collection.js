Students = new Mongo.Collection('students');

var Schemas = {};

Schemas.Day = new SimpleSchema({
  day: {
    type: String,
    label: 'Day',
    allowedValues: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
    autoform:{
      options:[
        {label: "Monday", value: "MONDAY"},
        {label: "Tuesday", value: "TUESDAY"},
        {label: "Wednesday", value: "WEDNESDAY"},
        {label: "Thursday", value: "THURSDAY"},
        {label: "Friday", value: "FRIDAY"},
        {label: "Saturday", value: "SATURDAY"},
        {label: "Sunday", value: "SUNDAY"}
      ]
    }
  },

  flexible: {
    type: Boolean,
    label: "Flexible",
    optional: true
  }
});

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
  startDate:{
    type: Date,
    label: "Start date"
  },
  moveDate:{
    type: Date,
    label: "Move date",
    optional:true
  },

  image:{
    type: SimpleSchema.RegEx.Url,
    label: "Image",
    optional: true
  },

  /**
   * Group can only be
   * 1. TODDLER
   * 2. INFANT
   */
  group: {
    type: String,
    label: "Class",
    allowedValues: ['TODDLER', 'INFANT'],
    autoform:{
      options:[
        {label: "Toddler", value: "TODDLER"},
        {label: "Infant", value: "INFANT"}
      ]
    }
  },

  /**
   * status would can only be values of
   * 1. "WAITLIST" -> for the kids how have paid the fee and have been approved by someone at OLB
   * 2. "APPLICATION" -> for the kids who only have filled out the application
   * 3. "ENROLLED" -> the kids who are currently attending OLB
   */
  status:{
    type: String,
    label: "Status",
    allowedValues: ['WAITLIST', 'APPLICATION', 'ENROLLED'],
    autoform:{
      options:[
        {label: "Waitlist", value: "WAITLIST"},
        {label: "Application", value: "APPLICATION"},
        {label: "Enrolled", value: "ENROLLED"}
      ],
      omit: true
    }
  },

  /**
   * order will capture the order of the student in the current waitlist
   */
  order:{
    type: Number,
    label: "Order",
    optional: true,
    autoform:{
      omit: true
    }
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
  },

  paidApplicationFee:{
    type: Boolean,
    label: "Application Fee"
  },

  daysEnrolled: {
    type: [Schemas.Day],
    label: "Days Enrolled",
    optional: true
  },

  daysWaitlisted: {
    type: [Schemas.Day],
    label: "Days Waitlisted",
    optional: true
  },

  daysRequested: {
    type: [Schemas.Day],
    label: "Days Requested"
  },

  classId:{
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
  },

  color: {
    type: String,
    label: "Color"
  }
});

Students.attachSchema(Schemas.Student);