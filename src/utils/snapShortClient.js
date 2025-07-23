import snapshot from '@snapshot-labs/snapshot.js';

const hub = 'https://hub.snapshot.org'; 
const client = new snapshot.Client712(hub);

export default client;
