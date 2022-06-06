let express = require("express");
let bodyParser = require("body-parser");
let app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));

// By default express only serves our main file as mentioned in the package.json and views folder, for telling express to use other files and folders we need to use the below command. 
app.use(express.static("./public"));

let items = ["Buy Food" , "Cook Food" , "Eat Food"];
let workItems = [];
// When we render the page then we render list.js and pass two variables kindofDay and newListItems.
app.get("/",function(req,res){
    let today = new Date()
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("hi-IN", options);

    res.render("list", {listTitle: day, newListItems: items});
})

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.post("/work", function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})
// When user will submit the form then that post request will be captured by the below function and we get the value of item that user has passed and then we push that value in our items array and redirects the reponse to the / url.
app.post("/",function(request,response){
    let item = request.body.newItem;
    // To check which list will be filled with user entered value
    if(request.body.list === "Work"){
        workItems.push(item);
        response.redirect("/work");
    }else{
        items.push(item);
        response.redirect("/");
    }  
})

app.listen(3000,function(){
    console.log("Server has started at port 3000");
})