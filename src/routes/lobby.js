import create from '../controllers/lobby/create.js';
import list from '../controllers/lobby/list.js';
import joinByGuid from '../controllers/lobby/joinByGuid.js';
import joinByCode from '../controllers/lobby/joinByCode.js';

export default [
    {
        path: '/lobby',
        verb: 'post',
        handler: create,
        authedOnly: true,
    },
    {
        path: '/lobby',
        verb: 'get',
        handler: list,
        authedOnly: true,
    },
    {
        path: '/lobby/code/:code/join',
        verb: 'post',
        handler: joinByCode,
        authedOnly: true,
    },
    {
        path: '/lobby/:guid/join',
        verb: 'post',
        handler: joinByGuid,
        authedOnly: true,
    },
]