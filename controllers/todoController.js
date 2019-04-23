var bodyParser = require("body-parser");
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://test:test@cluster0-faiw2.mongodb.net/test?retryWrites=true');


var todoSchema = new mongoose.Schema({
    item:String
});
 var Todo = mongoose.model('Todo',todoSchema);


//  var itemOne = Todo({item:"Buy Flowers"});
//     itemOne.save(function(err){
//      if(err) throw err;
//      console.log('item saved');
//  });



// var data = [{item:'get milk'},{item:'walk dog'}, {item:'keep some dog'}];

var urlEncodedParser = bodyParser.urlencoded({extended:false});
module.exports = function(app){

    app.get('/todo', function(req,res){
        Todo.find({}, function(err,data){
            if (err) throw err;
            res.render('todo',{todos:data});
        });
    });
    // app.get('/', function(req,res){
    //     res.render('todo', {todos:data});
    // });

    app.post('/todo',urlEncodedParser ,function(req,res){
        //get data from the view and add to mongo db
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw error;
            res.json(data);
        })
    });

    app.delete('/todo/:item', function(req,res){
        //delete requested data from the database
        Todo.find({item:req.params.item.replace(/\-/g,' ')}).remove(function(err,data){
            if (err) throw err;
            res.json(data);
        });
    });


}