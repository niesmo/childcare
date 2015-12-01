Color = new Mongo.Collection("colors");

var Schemas = {};

Schemas.Color = new SimpleSchema({
  color: {
    type: String,
    label: "Color"
  }
});

Color.attachSchema(Schemas.Color);
