import { Router } from 'https://deno.land/x/oak@v5.0.0/mod.ts';

const router = new Router();

router.get('/', ctx => {
    ctx.response.body = 'Hello NASA!';
});

export default router;
