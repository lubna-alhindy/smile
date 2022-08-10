const Helper = require('./Helper');

/// ----------------------------- ///

exports.getAllAds = async (context) => {
  try {
    return await context.models.ads.findAll({
      include: {
        model: context.models.postImages
      }
    });
  } catch (err) {
    throw new Error(err);
  }
}

/// ----------------------------- ///

exports.addAd = async (args, context) => {
  try {
    const {title, body, expireIn, images} = args;

    const ad = await context.models.ads.create({
      title: title,
      body: body,
      expireIn: expireIn
    });

    ad["postImages"] = [];
    for (let i = 0; i < images.length; i++) {
      const base64image = images[i].split(',')[1];

      const name = Helper.uniqueName("ads-" + ad.id + "-" + i).concat(
        base64image[0] === "/"
          ? ".jpg"
          : base64image[0] === "i"
          ? ".png"
          : base64image[0] === "R"
            ? ".gif"
            : ".webp"
      );

      const image = await Helper.convertBase64ToImage(base64image);

      if (!await Helper.writeImage(image, name)) {
        throw new Error("Internal server error, Try again!");
      }

      ad["postImages"].push(await context.models.postImages.create({
        name: await Helper.getImagePath(name),
        adId: ad.id
      }));
      ad["postImages"][ad["postImages"].length - 1].base64image = base64image;
    }

    return ad;
  } catch (err) {
    throw new Error(err);
  }
}

/// ----------------------------- ///

exports.updateAd = async (args, context) => {
  try {
    const {id, title, body, expireIn, images} = args;

    const ad = await context.models.ads.findOne({
      where: {
        id: id
      },
      include: {
        model: context.models.postImages
      }
    });

    if (title !== undefined) {
      ad.title = title;
    }
    if (body !== undefined) {
      ad.body = body;
    }
    if (expireIn !== undefined) {
      ad.expireIn = expireIn;
    }

    ad["postImages"] = [];
    if (images !== undefined) {
      for (let i = 0; i < ad.postImages.length; i++) {
        await Helper.deleteImage(ad.postImages[i].name);
        await context.models.postImages.destroy({
          where: {
            id: ad.postImages[i].id
          }
        });
      }

      for (let i = 0; i < images.length; i++) {
        const base64image = images[i].split(',')[1];

        const name = Helper.uniqueName("ads-" + ad.id + "-" + i).concat(
          base64image[0] === "/"
            ? ".jpg"
            : base64image[0] === "i"
            ? ".png"
            : base64image[0] === "R"
              ? ".gif"
              : ".webp"
        );

        const image = await Helper.convertBase64ToImage(base64image);
        if (!await Helper.writeImage(image, name)) {
          throw new Error("Internal server error, Try again!");
        }

        ad["postImages"].push(
          await context.models.postImages.create({
            name: await Helper.getImagePath(name),
            adId: ad.id
          })
        );

        ad["postImages"][i].base64image = base64image;
      }
    }

    return ad;
  } catch (err) {
    throw new Error(err);
  }
}

/// ----------------------------- ///

exports.deleteAd = async (args, context) => {
  try {
    const ad = await context.models.ads.findOne({
      where: {
        id: args.id
      },
      include: {
        model: context.models.postImages,
        attributes: ['id', 'name']
      }
    });

    for (let image of ad.postImages) {
      await Helper.deleteImage(image.name);
    }

    await ad.destroy();
  } catch (err) {
    throw new Error(err);
  }
}

/// ----------------------------- ///

exports.adsDeleter = async (args, context) => {
  const ads = await context.models.ads.findAll({
    include: {
      model: context.models.postImages,
      attributes: ['id', 'name']
    }
  });

  for (let ad of ads) {
    if (new Date(ad.expireIn) < new Date()) {
      for (let image of ad.postImages) {
        await Helper.deleteImage(image.name);
      }

      await context.models.ads.destroy({
        where: {
          id: ad.id
        }
      });
    }
  }
}