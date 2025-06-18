import express from 'express';
import { Connection, Client } from '@temporalio/client';

const app = express();
app.use(express.json());

app.post('/start-workflow', async (req, res) => {
  try {
    // const { input } = req.body;

    const connection = await Connection.connect({ address: 'localhost:7233' });

    const client = new Client({
      connection,
      namespace: 'default',
    });

    const handle = await client.workflow.start('CertificateGeneratorWorkflow', {
      // args: [input],
      // taskQueue: 'my-task-queue',
      // workflowId: `workflow-${Date.now()}`,\
      args: ['Sanjay Kanwar'],
      taskQueue: 'generate-certificate-taskqueue',
      workflowId: 'cert-generator-workflow-1',
    });

    res.status(200).json({ workflowId: handle.workflowId });
  } catch (err) {
    console.error('Error starting workflow:', err);
    res.status(500).json({ error: 'Failed to start workflow' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

