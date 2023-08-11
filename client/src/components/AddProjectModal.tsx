import { useState, FormEvent } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';
import { Watch } from 'react-loader-spinner';
import { Button, Modal, Input, Form, Select } from 'antd';

export default function AddProjectModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === '' || description === '' || status === '') {
      return alert('Please fill in all fields');
    }

    addProject();

    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
    setOpen(false);
  };

  if (loading) return <Watch width={25} wrapperStyle={{ display: 'flex', justifyContent: 'center' }} />;
  if (error) return 'Something Went Wrong';

  return (
    <>
      {!loading && !error && (
        <>
          <Button type='primary' danger onClick={() => setOpen(true)} icon={<FaList />}>
            New Project
          </Button>
          <Modal title='New Project' open={open} onCancel={() => setOpen(false)} footer={null}>
            <form onSubmit={onSubmit}>
              <div style={{ margin: '20px 0' }}>
                <label>Name</label>
                <Input onChange={(e) => setName(e.target.value)} value={name} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label>Description</label>
                <Input.TextArea
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ resize: 'none' }}
                  value={description}
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
              <Form.Item>
                <label>Client</label>
                <Select
                  value={clientId}
                  onChange={(value) => setClientId(value)}
                  options={data.clients.map(({ id, name }: Client) => ({ value: id, label: name }))}
                />
              </Form.Item>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </div>
            </form>
          </Modal>
        </>
      )}
    </>
  );
}
