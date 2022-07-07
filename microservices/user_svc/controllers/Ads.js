const Helper = require('./Helper');

/// ----------------------------- ///

exports.getAllAds = async (context) => {
    return await context.models.ads.findAll({
        include: {
            model: context.models.postImages
        }
    });
}

/// ----------------------------- ///

exports.addAd = async (args ,context) => {
    const {title ,body ,expireIn ,images} = args;

    const ad = await context.models.ads.create({
        title: title,
        body: body,
        expireIn: expireIn
    });

    ad["postImages"] = [];
    for(let i = 0 ; i < images.length ; i++){
        const name = Helper.uniqueName("ads-" + ad.id + "-" + i);

        const base64image = images[i].split(',')[1];

        const image = await Helper.convertBase64ToImage(base64image);
        if( !await Helper.writeImage(image ,name) ){
            throw new Error("Internal server error, Try again!");
        }

        ad["postImages"].push(await context.models.postImages.create({
            name: name,
            adId: ad.id
        }));
        ad["postImages"][ad["postImages"].length - 1].base64Image = base64image;
    }

    return ad;
}

/// ----------------------------- ///

exports.deleteAd = async (args ,context) => {
    const ad = await context.models.ads.findOne({
        where: {
            id: args.id
        },
        include: {
            model: context.models.postImages,
            attributes: ['id' ,'name']
        }
    });

    for(let image of ad.postImages){
        await Helper.deleteImage(image.name);
    }

    await ad.destroy();
}

/// ----------------------------- ///