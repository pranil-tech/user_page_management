const express = require("express");
const app = express();
const path = require("path");
const collection = require("./mongodb");

app.set("view engine", "hbs");
const templatePath = path.join(__dirname, "../template");
app.set("views", templatePath);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.post("/login", async (req, res) => {
    try{
        const user = await collection.findOne({email:req.body.email})
        if(user.password == req.body.password){
            res.render("home")
        }else{
            res.send("wrong password")
        }
    }catch{
        res.send("wrong details or new user")
    }
  });

app.post("/signup", async (req, res) => {
    const data={
        email:req.body.email,
        password:req.body.password
    }

    await collection.insertMany([data])

    res.render("home")
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
