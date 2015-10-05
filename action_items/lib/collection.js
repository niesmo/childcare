ActionItems = new Mongo.Collection('action_items');

var Schemas = {};

Schemas.ActionItem = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },

    description: {
        type: String,
        label: "Description",
        max: 4096
    },

    /**
     * Urgency of the Action Item. Can take the values of:
     * 1. LOW
     * 2. MEDIUM
     * 3. HIGH
     */
    urgency: {
        type: String,
        label: "Urgency",
        optional: true
    },

    /**
     * Priority of the Action Item. Can take the values of:
     * 1. LOW
     * 2. MEDIUM
     * 3. HIGH
     */
    priority: {
        type: String,
        label: "Priority",
        optional: true
    },
	
	/**
     * Type of the Action Item. Can take the values of:
     * 1. TODDLER
     * 2. INFANT
     * 3. OTHER
     */
    type: {
        type: String,
        label: "Type"
    },

	/**
     * Boolean of whether action item is completed or not. Can take the values of:
     * 1. TRUE
     * 2. FALSE
     */
    createdBy: {
        type: SimpleSchema.RegEx.Id
    },
	
	createdAt: {
		type: Date
	},
	
	isCompleted: {
        type: String,
		label: "IsCompleted"
    },

    completedBy: {
        type: SimpleSchema.RegEx.Id,
        optional: true
    },

    completedAt: {
        type: Date,
		optional: true
    }
});

ActionItems.attachSchema(Schemas.ActionItem)