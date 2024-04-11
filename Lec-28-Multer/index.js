const express = require("express")
const path = require("path")
const multer = require("multer")
const app = express();
const PORT = 5000;
//it will upload the photo coming from the frontend in uploads folder
//cb is callback , that null is the error , imp:do not forget to write ./ for current directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb( null, "./uploads")
    },
    filename: function (req, file, cb) {
        return cb(null , `${Date.now()}-${file.originalname}`)
    },
  })
  
  const upload = multer({ storage: storage })
//the data coming from frontend is not in form of json it is form data , so to parse that form data 
// we have to use this middleware 


app.set("view engine", "ejs");
app.set('views', path.resolve("./views"))
app.use(express.urlencoded({extended: false }))
app.get("/",(req,res)=>{
    console.log("hey there ");
    return res.render("homepage")
})
app.post("/upload", upload.single("profileImage"), (req,res) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/")
})
app.listen(PORT, () => { console.log(`server started at PORT ${PORT}`) })