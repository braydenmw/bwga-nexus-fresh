import { kv } from '@vercel/kv';
import type { ReportParameters, ReverseNexusQuery } from '../types';

export const config = { runtime: 'edge' };

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { task, payload } = await request.json();

  switch(task) {
    case 'generateStrategicReport':
      const params = payload as ReportParameters;
      const jobId = `report-${crypto.randomUUID()}`;

      // 1. Create the job object
      const job = {
        id: jobId,
        status: 'pending',
        params: params,
        createdAt: new Date().toISOString(),
      };

      // 2. Push the job to the queue (a simple list in Vercel KV)
      await kv.lpush('nexus_job_queue', job);
      await kv.set(jobId, job); // Also store job details by ID for status checks

      // 3. Immediately return the jobId to the user
      return new Response(JSON.stringify({ jobId }), { status: 202 }); // 202 Accepted

    case 'generateOutreachLetter':
      const { reportContent, userDetails } = payload;
      const letterJobId = `letter-${crypto.randomUUID()}`;

      const letterJob = {
        id: letterJobId,
        status: 'pending',
        task: 'generateOutreachLetter',
        payload: { reportContent, userDetails },
        createdAt: new Date().toISOString(),
      };

      await kv.lpush('nexus_job_queue', letterJob);
      await kv.set(letterJobId, letterJob);

      return new Response(JSON.stringify({ jobId: letterJobId }), { status: 202 });

    case 'reverseNexusSearch':
      const query = payload as ReverseNexusQuery;
      const reverseJobId = `reverse-${crypto.randomUUID()}`;

      const reverseJob = {
        id: reverseJobId,
        status: 'pending',
        task: 'reverseNexusSearch',
        payload: query,
        createdAt: new Date().toISOString(),
      };

      await kv.lpush('nexus_job_queue', reverseJob);
      await kv.set(reverseJobId, reverseJob);

      return new Response(JSON.stringify({ jobId: reverseJobId }), { status: 202 });

    // Short-running tasks can be handled directly here
    case 'fetchSymbiosisResponse':
      // ... (Your existing symbiosis logic can go here)
      break;

    default:
      return new Response('Invalid task', { status: 400 });
  }
}