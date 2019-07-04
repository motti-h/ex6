import { Product } from '../models';
import {store} from '../store';
import { Response, Request, NextFunction, RequestHandler } from 'express';
import * as productUtils from '../utils/productUtils';
import * as Logger from '../utils/logger';
import * as validation from '../validation/common';

let products = store.products;

const sizeIlegal = 3;
const createLogger = Logger.createLogger('productLogger');

export function productGetHandler(req: Request, res: Response, next: NextFunction): any {
    res.send(productUtils.getAllProducts());
}

export function productGetSpecificHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id;
    const maybeProduct = productUtils.findProduct(id);
    createLogger.info(`Requested project by id - ${id}`);
    return (maybeProduct) ? Promise.resolve(maybeProduct) : Promise.reject(new Error('404'));
}

export function productPostHandler(req: Request, res: Response, next: NextFunction): any {
    const newProduct: Product = req.body as Product;
    newProduct.id = (productUtils.getProductsLength() + 1).toString();
    store.products.push(newProduct);
    res.sendStatus(201);
}

export function productPutHandler(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id;
    const existing = productUtils.findProduct(id);

    if (!existing) {
       res.sendStatus(404);
       return;
    }

    const newProduct: Product = req.body as Product;

    if ( newProduct.name.length < sizeIlegal) {
        next(new Error('409'));
        return;
    }

    Object.assign(existing , newProduct);
    res.send(existing);
}

export function productDeleteHandler(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id;
    const existingIndex = products.findIndex(product => product.id === id);

    if (existingIndex < 0) {
        res.sendStatus(404);
        return;
    }

    products.splice(existingIndex, 1);
    res.sendStatus(204);
}

export function middleCheckName(req: Request, res: Response, next: NextFunction): any {
    const newProduct: Product = req.body as Product;
    validation.getOrThrow<string>(newProduct.name, validation.nameSchema);
    next();
}
