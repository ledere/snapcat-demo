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