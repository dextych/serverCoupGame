import db from '#db';

export default async (userData, options) => db.User.create(userData, options);
