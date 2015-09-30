Template.studentDetail.helpers({
  parents:function(){
    var studentParents = StudentParents.find({studentId: this._id});
    var parentIds = studentParents.map(function(v){return v.parentId;});
    var parents = Parents.find({_id: {$in: parentIds}});
    return parents;
  }
});