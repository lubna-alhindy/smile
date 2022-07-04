const Helper = require('./Helper');

exports.getAllAds = async (context) => {
    return await context.models.ads.findAll({
        include: {
            model: context.models.postImages
        }
    });
}

exports.addAd = async (args ,context) => {
    const {title ,body ,expireIn ,images} = args;

    const ad = await context.models.ads.create({
        title: title,
        body: body,
        expireIn: expireIn
    });

    ad[images] = [];
    for(let i = 0 ; i < images.length() ; i++){
        const name = Helper.uniqueName("ads" + i);

        const base46image = images[i].split(',')[1];

        const image = await Helper.convertBase64ToImage(base46image);

        await Helper.writeImage(image ,name);

        ad[images].push( await context.models.postImages.create({
            url: name,
            adId: ad.id,
            postId: null,
            postRequestId: null
        }));
    }

    return ad;
}

exports.deleteAd = async (args ,context) => {
    const ad = await context.models.ads.findOne({
        where: {
            id: args.id
        },
        include: {
            model: context.models.postImages,
            attributes: ['id']
        }
    });

    for(let i = 0 ; i < ad.postImages.length() ; i++){
        await context.models.postImages.destroy({
            where: {
                id: ad.postImages[i].id
            }
        });
    }

    await ad.destroy();
}