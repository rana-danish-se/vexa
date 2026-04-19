import * as dotenv from 'dotenv';
dotenv.config();

await import('./config/env.js');

const { default: app } = await import('./app.js');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
 * ROLE: Entry-point orchestrating explicit operational application ignition ensuring accurate loading order explicitly respecting strict environment validations concurrently evaluating successfully entirely preceding express handling boundaries.
 * FUNCTIONS: App listener trigger exclusively.
 * ACTIONS: Reads raw config environment instances isolating configurations checking missing parameters actively crashing out aggressively otherwise attaching fully functional routers straight to the open network interface targeting operational port mappings statically binding listener logic seamlessly.
 * USED BY: NodeJS execution core globally mapping directly mapped execution starting the server (e.g., node server.js).
 */
