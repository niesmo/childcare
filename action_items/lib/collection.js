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


    createdBy: {
        type: SimpleSchema.RegEx.Id,
		label: "Created By",
        optional: true
    },
	
	createdAt: {
		type: Date,
		label: "Created At"
	},
	
		/**
     * Boolean of whether action item is completed or not. Can take the values of:
     * 1. TRUE
     * 2. FALSE
     */
	isCompleted: {
        type: Boolean,
		label: "Is Completed"
    },

    completedBy: {
        type: SimpleSchema.RegEx.Id,
		label: "Completed By",
        optional: true
		
    },
	
    completedAt: {
        type: Date,
		label: "Completed At",
		optional: true
    },
    isSystemMessage: {
        type: Boolean,
        label: "Is System Message"
    }
});

ActionItems.attachSchema(Schemas.ActionItem)