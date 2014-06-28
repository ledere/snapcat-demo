exports.getCats = function(CatModel) {
    return function(req, res) {
        CatModel.find( function(err, docs) {
            if (!err) {
                // render page using json
                return res.json(docs);
            } else {
                // generate error message
                return res.send( 500, { "errorKey" : 12345, "errorText" : "it has failed" });
            }
        });
    };
};

exports.getCat = function(CatModel) {
    return function(req, res) {
        CatModel.findById( req.params.id, function(err, docs) {
            if (!err) {
                // render page using json
                return res.json(docs);
            } else {
                // generate error message
                return res.send( 500, { "errorKey" : 12345, "errorText" : "it has failed" });
            }
        });
    };
};
