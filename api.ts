import { Router } from './deps.ts';
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

router.delete('/launches/:id', ctx => {
    if (ctx.params?.id) {
        // launches.removeOne(Number(ctx.params.id));
        const result = launches.removeOne(Number(ctx.params.id));
        if (result) {
            ctx.response.body = { success: result };
        } else {
            ctx.throw(400, "Launch with that ID doesn't exist");
        }
    }
});

router.post('/launches', async ctx => {
    const body = await ctx.request.body();

    launches.addOne(body.value);

    ctx.response.body = { success: true };
    ctx.response.status = 201;
});

export default router;
