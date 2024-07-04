const express= require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");
const { setHeapSnapshotNearHeapLimit } = require("v8");
const methodOverride = require("method-override");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.json());
app.use(methodOverride("_method"));
main()
.then(()=>{
    console.log("connection successful");
   
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');}

let chat1 = new chat({
    from: "neha",
    to: "priya",
    msg: "hello priya",
    created_at: new Date()
});
/*chat1.save().then((res)=>{
    console.log(res);
});*/
app.get("/chats",async(req,res)=>{
    let chats =    await chat.find();
    console.log(chats);
   res.render("index.ejs",{chats});
    
});
app.get("/chats/new",(req,res)=>{
    res.render("views.ejs");
})
app.post("/chats", (req, res) => {
   
      let { to, from, msg } = req.body;
      let newChat = new chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
      });
       newChat.save().then(()=>{
         console.log("new chat was saved");
       });
      console.log(newChat);
      res.redirect("/chats");
    });
    app.get("/chats/:id/edit",async(req,res)=>{
      let {id} = req.params;
      let chats = await chat.findById(id);
      res.render("edit.ejs",{chat:chats});
    });
    app.put("/chats/:id",async(req,res)=>{
      let {id} = req.params;
      let {msg:newmsg} = req.body;
      let updatedchat = await chat.findByIdAndUpdate(id,{msg:newmsg},{runValidators:true,new:true});
     console.log(updatedchat);
     res.redirect('/chats');
    });
    app.delete("/chats/:id",async (req,res)=>{
      let {id} =req.params;
      let deletedchat = await chat.findByIdAndDelete(id);
      console.log(deletedchat);
      res.redirect("/chats");
    })
app.get("/",(req,res)=>{
    res.send("root is working");
});

app.listen(8080, ()=>{
    console.log("server is listening to port 8080");
})