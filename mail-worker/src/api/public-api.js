import app from '../hono/hono';
import result from '../model/result';
import publicService from '../service/public-service';

app.post('/public/genToken', async (c) => {
	const data = await publicService.genToken(c, await c.req.json());
	return c.json(result.ok(data));
});

app.post('/public/emailList', async (c) => {
	const list = await publicService.emailList(c, await c.req.json());
	return c.json(result.ok(list));
});

app.post('/public/genCodeLink', async (c) => { 	const data = await publicService.genCodeLink(c, await c.req.json()); 	return c.json(result.ok(data)); }); app.get('/get-code', async (c) => { 	const { email, key, format } = c.req.query(); 	const data = await publicService.getCode(c, { email, key }); 	if (format === 'text') { 		return c.text(data.code || ''); 	} 	return c.json(result.ok(data)); }); app.post('/public/syncBoxes', async (c) => { 	const data = await publicService.syncBoxesPush(c, await c.req.json()); 	return c.json(result.ok(data)); }); app.get('/public/syncBoxes', async (c) => { 	const data = await publicService.syncBoxesPull(c, {}); 	return c.json(result.ok(data)); }); app.post('/public/addUser', async (c) => {
	await publicService.addUser(c, await c.req.json());
	return c.json(result.ok());
});
