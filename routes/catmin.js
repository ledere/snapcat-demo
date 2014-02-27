exports.listCats = function(CatModel) {
    return function(req, res) {
        CatModel.find( function(err, docs) {
            if (!err) {
                var message;
                if (docs.length < 1) {
                    message = "There are currently no cats in the system";
                }
                // render page using jade
                return res.render('catlist', {
                    "catlist" : docs,
                    "message" : message
                })
            }
        });
    };
};

exports.displayAddCatForm = function() {
    return function(req, res) {
        res.render('addCatForm', { title: 'Add New Cat' });
    };
};

exports.addCat = function (CatModel) {
    return function (req, res) {
        var cat = new CatModel({
            name: req.body.name,
            description: req.body.description
        });
        cat.save(function (err) {
            if (!err) {
                // redirect to main page
                res.location("catmin");
                res.redirect("catmin");
            }
            else {
                res.render('addCatForm', { title: 'Add New Cat', message: err });
            }
        });
    }
};

exports.deleteCat = function(CatModel) {
    return function(req, res) {
        return CatModel.findById( req.params.id, function(err, cat) {
            return cat.remove(function (err) {
                if (!err) {
                    // redirect to main page
                    res.location("catmin");
                    res.redirect("catmin");
                } else {
                    console.log("error removing cat");
                }
            })
        });
    }
};
