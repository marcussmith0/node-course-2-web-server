const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("engine view", "hbs");
hbs.registerHelper("currentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {

    var now = new Date().toString();
    var log =  `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFileSync("data.log", log + "\n");

    next();
});

app.use((req, res, next) => {
    res.render("maintain.hbs", {
        pageTitle: "SITE UNDER MAINTAINENCE",
        welcomeMessage: "this site is being maintained right now...",
    });
});


app.get("/", (req, res) => {

    res.render("home.hbs", {
        pageTitle: "",
        welcomeMessage: "welcome the homepage...",

    });

});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page",
    });
});

app.get("/contact", (req, res) => {
    res.send("This is the contact page...");
});

app.get("/fuckyou", (req, res) => {
    res.send("This is the fuckyou page.... bitch");
});

app.get("/bad", (req, res) => {
    res.send("page not found...");

});

app.get("/help", (req, res) => {
    res.sendFile("/public/help.html");
});

app.listen(3000, ()=> {
    console.log("server is running...");
})