exports.defineCat = function (mongoose) {
    var Schema = mongoose.schema;
    // our Cats look like this
    var Cat = new mongoose.Schema({
        name: { type: String, required: true },
        description: { type: String, required: false }
    });
    var CatModel = mongoose.model('Cat', Cat);
    return CatModel;
}