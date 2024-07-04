const mongoose = require("mongoose");
const chat = require("./models/chat.js");
main()
.then(()=>{
    console.log("connection successful");
   
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let allChats = [
    {
        from:"neha",
        to:"preeti",
        msg:"send me the tutorial notes",
        created_at: new Date(),
},
{
    from:"rohit",
    to:"utkarksh",
    msg:"tiwari chl game khelte hain",
    created_at: new Date(),
},
{
    from:"ahmed",
    to:"simpal",
    msg:"love you 3000",
    created_at: new Date(),
},{
    from:"simpal",
    to:"iqra",
    msg:"i love u baby",
    created_at: new Date(),
},

];
chat.insertMany(allChats);