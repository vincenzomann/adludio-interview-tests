const router = require("express").Router();
let Permutation = require("./perms-model"); //mongoose model
let logic = require("./perms-logic");

// Get specific permutation id
router.route("/:query").get((req, res) => {
  // get search query the url and find the permutation accordingly
  // change query to uppercase because the perms are case sensitive
  const search = req.params.query.toUpperCase();
  // find the index within the array that matches the query string
  Permutation.aggregate([
    {
      $project: {
        indexOfGivenPermutation: {
          $indexOfArray: ["$perms", search]
        },
        _id: false //don't return the document id to the client
      }
    }
  ])
    // then return message to the client, or catch any errors
    .then(perm => res.json(perm))
    .catch(err => res.status(400).json("Error: " + err));
});

//handle POST requests at the 'permuation-index/add' url
router.route("/add").post((req, res) => {
  // create array of permutations from the string
  const permsArray = logic.createPermutations("ODILUDA");
  // create a document object that holds the array
  const permsCollection = new Permutation({
    perms: [...permsArray]
  });
  // save object to the database
  // then return message to the client, or catch any errors
  permsCollection
    .save()
    .then(() => res.json("Permutation Collection added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//handle Get request at the root url to get whole perms array
router.route("/").get((req, res) => {
  Permutation.find()
    .then(perm => res.json(perm))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
