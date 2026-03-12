import db from '#db';

export default async (name, options) => {
    return await db.User.findOne({
        where: {name},
        ...options
    });
};