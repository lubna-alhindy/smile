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

exports.deleteAd = async (args ,models) => {
    const ad = await models.ads.findOne({
        where: {
            id: args.id
        }
    });

    await ad.destroy();
}