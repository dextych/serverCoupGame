import db from '#db';

export default async (guid, options = {}) => {
    return await db.User.findOne({
        where: {guid},
        ...options
    });
};