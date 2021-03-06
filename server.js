var express = require("express");
var app = express();
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var seedDB      = require("./seeds");
var passport    = require("passport");
var LocalStrategy = require("passport-local");
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
// User        = require("./models/user"),

// var middleware = require("/middleware/index.js"); //will auto include /index.js
//mongoose.connect('')
//mongoose.connect("mongodb://localhost/to-do");

// V - defined enviromental variable DATABASEURL - on HEROKU settings -> Config Vars
var url = process.env.DATABASEURL || "mongodb://localhost/PHSL";
mongoose.connect(url);
//mongoose.connect("mongodb://lang:_____@ds011775.mlab.com:11775/to-do" || "mongodb://localhost/to-do");

// V - Express middlewear - express.static(root, [options]) - http://expressjs.com/en/api.html#express.static
app.use(express.static(__dirname+'/public'));
// V - morgan(format, options) - https://www.npmjs.com/package/morgan
app.use(morgan('dev'));

// V - https://www.npmjs.com/package/body-parser
app.use(bodyParser.urlencoded({'extended':'true'}));
// V - bodyParser.json(options)
app.use(bodyParser.json());
// V - http://jsonapi.org/format/
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is the secret phrase",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(function(req, res, next){
//     res.locals.currentUser = req.user;
//     res.locals.error = req.flash("error");
//     res.locals.success = req.flash("success");
//     next();
// });

//Define Component mongoose schema - 
var componentSchema = new mongoose.Schema({
    number: Number,
    name: String,
    WBS: String,
    image: String,
    domain: String,
    responsibleEngineer: String,
    stage: String,
    description: String,
    quantity: Number,
    FTU: Number,
    EDU: Number,
    GTU: Number,
    MM_DM: Number,
    makeVsBuy: String,
    weight: Number,
    power: Number,
    size: String,
    vendor: String,
    cost: Number,
    added: {type: Date, default: Date.now}
});

//Model
var Component = mongoose.model('Component', componentSchema);

//If you want to seed the component library
seedDB(Component);

//USER SCHEMA
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema);

//Middleware 
// var Campground = require("../models/campground");
// var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You do not have the correct permissions to do this");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You must be logged in to do this");
        res.redirect("back");
    }
}


middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You do not have the correct permissions to do this");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You must to be logged in to do this");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // req.flash("error", "You must to be logged in to do this")
    res.redirect("/login");
}

module.exports = middlewareObj

//READ ALL COMPONENTS
// V - Express application method - app.get(path, callback [, callback ...]) -http://expressjs.com/en/api.html#app.get
app.get('/api/components', function(req, res){
    // V- mongoose - Model.find(conditions, [projection], [options], [callback]) http://mongoosejs.com/docs/api.html#model_Model.find
    Component.find(function(err, components){
        // V - javascript error handling
        if (err){
            // V - express responce method - res.send([body])
            res.send(err);
        }
        // V - express responce method - res.json([body])
        res.json(components);
    });
});

//CREATE A COMPONENT
app.post('/api/components', function(req, res){

        var number = req.body.number+1;
        var name = req.body.name;
        var WBS = req.body.WBS;
        var image = req.body.image;    
        var domain = req.body.domain;
        var responsibleEngineer = req.body.responsibleEngineer;
        var stage = req.body.stage;
        var description = req.body.description;
        var quantity = req.body.quantity;
        var FTU = req.body.FTU;
        var EDU = req.body.EDU;
        var GTU = req.body.GTU;
        var MM_DM = req.body.MM_DM;
        var makeVsBuy = req.body.makeVsBuy;
        var weight = req.body.weight;
        var power = req.body.power;
        var size = req.body.size;
        var vendor = req.body.vendor;
        var cost = req.body.cost;
        var added = req.body.added;
        
        var newComponent = {number:number,name:name,WBS:WBS,image:image,domain:domain,responsibleEngineer:responsibleEngineer,stage:stage,description:description,quantity:quantity,FTU:FTU,EDU:EDU,GTU:GTU, MM_DM: MM_DM,makeVsBuy:makeVsBuy,weight:weight,power:power,size:size,vendor:vendor,cost:cost,added:added};
        //console.log(newComponent)
    Component.create(newComponent, function(err, components){
        if (err){
            res.send(err);
        } 
        Component.find(function(err, components){
            if (err){
                res.send(err);
            }
            res.json(components);
        });
    });
});

// UPDATE A COMPONENT
app.put('/api/components/:id', function(req, res) {
    //console.log('/api/components/:id')
    var number = req.body.number;
    var name = req.body.name;
    var WBS = req.body.WBS;
    var image = req.body.image;    
    var domain = req.body.domain;
    var responsibleEngineer = req.body.responsibleEngineer;
    var stage = req.body.stage;
    var description = req.body.description;
    var quantity = req.body.quantity;
    var FTU = req.body.FTU;
    var EDU = req.body.EDU;
    var GTU = req.body.GTU;
    var MM_DM = req.body.MM_DM;
    var makeVsBuy = req.body.makeVsBuy;
    var weight = req.body.weight;
    var power = req.body.power;
    var size = req.body.size;
    var vendor = req.body.vendor;
    var cost = req.body.cost;
    var added = req.body.added;
    
    var updatedComponent = {number:number,name:name,WBS:WBS,image:image,domain:domain,responsibleEngineer:responsibleEngineer,stage:stage,description:description,quantity:quantity,FTU:FTU,EDU:EDU,GTU:GTU, MM_DM: MM_DM,makeVsBuy:makeVsBuy,weight:weight,power:power,size:size,vendor:vendor,cost:cost};
        Component.findByIdAndUpdate(req.params.id, updatedComponent, function(err, components){
        //Component.update(updatedComponent, function(err,components){
        if(err){
            res.send(err);
        }
        Component.find(function(err, components){
            if (err){
                res.send(err);
            }
            //console.log(components)
            res.json(components);
        });
    });
    // Component.update(req.params.id, req.body, createCallback(res, function(todo) {
    // res.send(createTodo(req, todo));
  
});

//DELETE A COMPONENT
app.delete('/api/components/:id', function(req, res){
    
    //console.log(req.params.id)
    Component.findByIdAndRemove(req.params.id, function(err){
    //Component.remove({_id : req.params.component_id}, function(err, component){
        if(err){
            res.send(err);
        }
        Component.find(function(err, components){
            if (err){
                res.send(err);
            }
            res.json(components);
        });
    });
});

//Angular application send!

//login form
// app.get("", function(req, res) {
//     res.sendFile('public/login.html');
// });

app.get("*", function(req, res){
    // V - express responce method - res.sendFile(path [, options] [, fn])
    res.sendFile('public/index.html');
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Running the PHSL server...');
});
