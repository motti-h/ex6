import { Router } from 'express';
import * as categoryHendlers from '../routesHendlers/CategorysHendlers';
import * as middle from '../utils/middleware';
import * as credentials from '../models/credentials';
const categoryRouter = Router();

categoryRouter.use('/:id', middle.middleCheckId);

categoryRouter.get('/', categoryHendlers.categoryGetHandler);

categoryRouter.get('/:id/products', categoryHendlers.categoryGetProductsByIdHandler);

categoryRouter.get('/:id', categoryHendlers.categoryGetByIdHandler);

categoryRouter.use(
middle.authenticate(),
middle.authorize(credentials.UserRole.Admin));

categoryRouter.post('/', categoryHendlers.categoryPostHandler);

categoryRouter.put('/:id', categoryHendlers.categoryPutHandler);

categoryRouter.delete('/:id', categoryHendlers.categoryDeleteHandler);

export {categoryRouter};
