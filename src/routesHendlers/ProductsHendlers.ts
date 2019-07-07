import { Product } from '../models';
import { Response, Request, NextFunction, RequestHandler } from 'express';
import * as Logger from '../utils/logger';
import * as validation from '../validation/common';
import { resolveStore} from './store';

const sizeIlegal = 3;
const createLogger = Logger.createLogger('productLogger');

export function productGetHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const myStore = resolveStore(res);
    return myStore.products.all();
}

export function productGetSpecificHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id;
    createLogger.info(`Requested project by id - ${id}`);
    const myStore = resolveStore(res);
    const maybeProduct = myStore.products.findById(id);
    return (maybeProduct) ? Promise.resolve(maybeProduct) : Promise.reject(new Error('404'));
}

export function productPostHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const newProduct: Product[] = req.body as Product[];
    const myStore = resolveStore(res);
    return myStore.products.add(newProduct);
}

export function productPutHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id;
    const replaceProduct: Product = req.body as Product;
    replaceProduct.id = id;
    const myStore = resolveStore(res);
    return myStore.products.replace(replaceProduct);
}

export function productDeleteHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id;
    const myStore = resolveStore(res);
    return myStore.products.deleteById(id);
}

export function middleCheckName(req: Request, res: Response, next: NextFunction): any {
    const newProduct: Product = req.body as Product;
    validation.getOrThrow<string>(newProduct.name, validation.nameSchema);
    next();
}
