import { Category } from '../models';
import {store} from '../store';
import { Response, Request, NextFunction } from 'express';
import * as categoryUtils from '../utils/categoryUtils';
import * as Logger from '../utils/logger';

//const categories = store.categories;
//const products = store.products;
const createLogger = Logger.createLogger('productLogger');

export function categoryGetHandler(req: Request, res: Response, next: NextFunction): any {
    res.send(store.categories);
    console.log(store.categories);
}

export function categoryGetProductsByIdHandler(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id;
    const existing = categoryUtils.getCategoryById(id);
    createLogger.info(`Requested project by id - ${id}`);

    if (!existing) {
        res.sendStatus(404);
        return;
    }

    const productsArr = store.products.filter(product => (product.categoryId === existing.id));
    res.send(productsArr);
}

export function categoryGetByIdHandler(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id;
    const existing = categoryUtils.getCategoryById(id);

    if (!existing) {
        res.sendStatus(404);
        return;
    }

    res.send(existing);
}

export function categoryPostHandler(req: Request, res: Response, next: NextFunction): any {
    const newCategory: Category = req.body as Category;

    for (const item of store.categories) {
        if (item.name === newCategory.name) {
            next(new Error('409'));
            return;
        }
    }
    newCategory.id = (store.products.length + 1).toString();
    store.categories.push(newCategory);
    res.sendStatus(201);
    return;
}

export function categoryPutHandler(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id;
    const existing = categoryUtils.getCategoryById(id);

    if (!existing) {
        res.sendStatus(404);
        return;
    }
    const newCategory: Category = req.body as Category;
    (existing.name = newCategory.name);
    res.send(existing);
}

export function categoryDeleteHandler(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id;
    const existingIndex = store.categories.findIndex(p => p.id === id);

    if (existingIndex < 0) {
        res.sendStatus(404);
        return;
    }

    store.categories.splice(existingIndex, 1);
    res.sendStatus(204);
    return;
}



