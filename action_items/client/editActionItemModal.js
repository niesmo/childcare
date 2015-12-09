Template.editStudentModal.onCreated(function(){
  Meteor.subscribe("ActionItems");
  Errors.remove({type:'validation'});
});


Template.editStudentModal.helpers({
  actionItem: function () {
    var id = Session.get('actionItemToEdit');
    return ActionItems.findOne({_id: id});
  },
  isInfant:function(){
    var id=Session.get('actionItemToEdit');
    var actionItem = ActionItems.findOne({_id:id});
    if(actionItem.type=='INFANT'){
      return true;
    }
    return false;
  },
  isToddler:function(){
    var id=Session.get('actionItemToEdit');
    var actionItem = ActionItems.findOne({_id:id});
    if(actionItem.type=='TODDLER'){
      return true;
    }
    return false;
  },
});

Template.editActionItemModal.events({
  "submit form":function(event){
    event.preventDefault();
    Errors.remove({type:'validation'});
    //retrieve data from form
    var actionItemId = Session.get('actionItemToEdit');

    //retrieve data from form
    var formValidated=true;




    var data = {
      description: event.target.description.value,
      type: $(event.target).find('input:radio[name=type]:checked').val(),
    };

    if(!editValidate(data, ActionItems.findOne({_id:actionItemId}).status)){
      formValidated = false;
    }
    if(!formValidated){
      scroll(0,0);
      return;
    }

      Meteor.call('EditActionItem', data, actionItemId, EditActionItemCallback);
      Modal.hide('editActionItemModal');
    });


    Errors.remove({});
  Meteor.call('EditActionItem', data, actionItemId, Session.get('editMode'), EditActionItemCallback);
    Modal.hide('editActionItemModal');
  }
});

function EditActionItemCallback(err, res){
  if(err){
    // Do some real error checking and let the use know what happned
    console.log(err);
    alert("Something went wrong. " + err);
  }

  if(res.status === 201){
    Router.go("actionItems");
  }
  return;
}


$('#sel1').change(function(){
  alert('hello');

  alert(Blaze.getData($('#sel1').get(0)));
});
