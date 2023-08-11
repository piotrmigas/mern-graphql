import { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutations';
import { Input, Button, Select, Form, Divider } from 'antd';

type Props = {
  project: Project;
};

export default function EditProjectForm({ project }: Props) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(() => {
    switch (project.status) {
      case 'Not Started':
        return 'new';
      case 'In Progress':
        return 'progress';
      case 'Completed':
        return 'completed';
      default:
        throw new Error(`Unknown status: ${project.status}`);
    }
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert('Please fill out all fields');
    }

    updateProject();
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Divider>Update Project Details</Divider>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Name</label>
          <Input onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Description</label>
          <Input.TextArea
            value={description}
            style={{ resize: 'none' }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Form.Item style={{ marginBottom: 20 }}>
          <label>Status</label>
          <Select
            value={status}
            onChange={(value) => setStatus(value)}
            options={[
              { value: 'new', label: 'Not Started' },
              { value: 'progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' },
            ]}
          />
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
}
