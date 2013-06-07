var constants = require('../constants');
var request = require('request');
var helpers = require('../helpers');


exports.updatePost = function(req,res){
  
    var dataToPost = req.body;
    if(!dataToPost){return res.send(400);}
    var url = constants.queries.postType()+dataToPost.id;
    var contributor = helpers.getContributor.getRoleFromSecret(dataToPost.secret);
    var condition = contributor.role === 'admin' || contributor.details.name === dataToPost.postedBy;    
    if(!condition) return res.send(403);    
    request(helpers.setHeaders(url,prepareDataForPosting(dataToPost)),function(error,response,body){
        if(error)return res.send(500);
        return res.send(200);
    });
};

function prepareDataForPosting(data){
    
    delete data["secret"];
    data.postedOn = parseInt(data.postedOn);
    return data;            
}