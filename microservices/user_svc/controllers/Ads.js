exports.getAllAds = async (context) => {
    return await context.models.ads.findAll();
}

exports.addAd = async (args ,context) => {
    return await context.models.ads.create({
        title: args.title,
        body: args.body,
        expireIn: args.expireIn
    });
}

exports.deleteAd = async (args ,context) => {
    const ad = await context.models.ads.findOne({
        where: {
            id: args.id
        }
    });

    await ad.destroy();
}