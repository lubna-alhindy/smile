exports.getAllAds = async (models) => {
    return await models.ads.findAll();
}

exports.addAd = async (args ,models) => {
    return await models.ads.create({
        title: args.title,
        body: args.body,
        expireIn: args.expireIn
    });
}