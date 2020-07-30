import { Router } from 'https://deno.land/x/oak@v5.0.0/mod.ts';

import * as launches from './models/launches.ts';
import * as planets from './models/planets.ts';

const router = new Router();

router.get('/', ctx => {
    ctx.response.body = 'Hello NASA!';
});

router.get('/planets', ctx => {
    ctx.response.body = planets.getAllPlanets();
});

router.get('/launches', ctx => {
    ctx.response.body = launches.getAll();
});

router.get('/launches/:id', ctx => {
    if (ctx.params?.id) {
        const launchesList = launches.getOne(Number(ctx.params.id));
        if (launchesList) {
            ctx.response.body = launchesList;
        } else {
            ctx.throw(400, "Launch with that ID doesn't exist");
        }
    }
});

export default router;
