const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();

const homeStartingContent = "Lacus vel facilisis volutpat est egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnnis dis partuiret montes nascetur mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odi ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncous est pellentesque. Dictumst vestibulum rhoncous est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed.Platea dictumst quisque sagittis purus sit.Egestas sed sed risus pretium quam vulputate diginissim suspendisse.Mauris in aliquam sem fringilla.Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros.Enim ut tellus elements sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncous urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Lacullis nunc sed augue lacus. Interedum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravidia dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];


app.get('/', function (req, res) {

    res.render('home', { startContent: homeStartingContent, homeContent: posts });

});

app.get("/about", function (req, res) {

    res.render("about", { startContent: aboutContent });

})

app.get("/contact", function (req, res) {

    res.render("contact", { startContent: contactContent });
})

app.get("/compose", function (req, res) {
    res.render("compose");

});

app.post("/compose", function (req, res) {

    const post = {
        title: req.body.composeTitle,
        content: req.body.composePost

    };

    posts.push(post);
    res.redirect("/");



});

app.get("/posts/:postName", function (req, res) {
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function (post) {
        const storedTitle = _.lowerCase(post.title);

        if (storedTitle === requestedTitle) {
            res.render("post", {
                title: post.title,
                content: post.content
            });
        }
    });

});


app.listen(3000, function () {
    console.log('Server is listening on port 3000');
});