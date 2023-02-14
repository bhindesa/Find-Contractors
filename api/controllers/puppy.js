const Puppy = require('../models/puppy');

function puppyList(req, res){
    Puppy.find()
    .then((puppies) => {
        res.status(200).json(puppies);
    })
}


function searchPuppy(req, res){
    console.log(req.params.searchItem)
    res.status(200).json(req.params.searchItem);
}

module.exports = {
    puppyList,
    searchPuppy
}