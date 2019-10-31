// ODILUDA is 7 chars so 7! is 5040 permuations
// however want all combinations too
// and want to remove duplicates
// recursion required for permuations/factorial n x (n-1)! then times all combinations

// Global array to add all combinations of permutations
// initialise with empty value as "" is a subset of any string
var totalPerms = [""];

calcPermutations = string => {
  // when reached end of recursive subpermutation, return the only char left
  if (string.length < 2) return string;

  // multiple instances of this local array, one for each recursive call
  // the subPermutations array is reinitialised for each recursive call
  // but the values in each parent call keeps its values
  // therefore highest level call will have the final permutation values
  var subPermutations = [];

  //iteration through the string
  for (var i = 0; i < string.length; i++) {
    // get char at current iteration
    var char = string[i];

    // get a copy of the characters on each side of the current char iteration
    let leftSide = string.slice(0, i);
    let rightSide = string.slice(i + 1, string.length);
    // concatonate them into one string
    var remainingString = leftSide + rightSide;

    // recurcively call the function to get all the sub permutations of the remaining string
    for (var subPermutation of calcPermutations(remainingString)) {
      // combine the selected iteration char with the sub permutation
      // and add the result to this recursive permuations array
      subPermutations.push(char + subPermutation);
      // also add them to the global totalPerms array,
      // which will later remove the duplicates
      totalPerms.push(char + subPermutation);
    }
  }
  // return subPermutations array back up to parent call
  return subPermutations;
};

// remove duplicates and sort
getSortedUniqueList = permutations => {
  //convert to Set becuase a set cannot contain duplicates
  // so from 30241 (5040*6) permutations*combinations to 7007 unique permutations
  var permsSet = new Set(permutations);
  // convert back to array for ease of manipulation
  var permsArray = [...permsSet];
  // sort array
  return permsArray.sort();
};

getIndexOfPermutation = (list, string) => {
  // convert string to uppercase as permutations are case sensitive
  const str = string.toUpperCase();
  // Find the string in the permutations list and return the index
  const index = list.indexOf(str);
  if (index != -1) return index;
  return 'That string is not a permutation of "ODILUDA"';
};

// create all the permutations for ODILUDA
exports.createPermutations = str => {
  // eg "ODILUDA";
  const string = str.toUpperCase(); //avoid case sensitivity
  calcPermutations(string);
  let permutations = getSortedUniqueList(totalPerms);
  return permutations;
};

// let perms = createPermutations("odiluda");
// let index = getIndexOfPermutation(perms, "adludio");
// console.log(perms);
// console.log(index);
