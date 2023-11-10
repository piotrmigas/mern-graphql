import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';
import { Button, Modal, Input, Form, Select } from 'antd';

export default function AddProjectModal() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const [addProject] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      const { projects }: any = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onFinish = ({ name, description, status, clientId }: Project) => {
    if (!name || !description || !clientId) {
      alert('Please fill in all fields');
    } else {
      addProject({ variables: { name, description, clientId, status } });
      form.resetFields();
      setOpen(false);
    }
  };

  return (
    <>
      <Button type='primary' danger onClick={() => setOpen(true)} icon={<FaList />}>
        New Project
      </Button>
      {!loading && !error && (
        <Modal title='New Project' open={open} onCancel={() => setOpen(false)} footer={null}>
          <Form initialValues={{ status: 'new' }} form={form} onFinish={onFinish} layout='vertical'>
            <Form.Item name='name' style={{ margin: '20px 0' }} label='Name'>
              <Input placeholder='Enter project name' />
            </Form.Item>
            <Form.Item name='description' style={{ marginBottom: 20 }} label='Description'>
              <Input.TextArea style={{ resize: 'none' }} placeholder='Enter description' />
            </Form.Item>
            <Form.Item name='status' style={{ marginBottom: 20 }} label='Status'>
              <Select
                onChange={(value) => form.setFieldValue('status', value)}
                options={[
                  { value: 'new', label: 'Not Started' },
                  { value: 'progress', label: 'In Progress' },
                  { value: 'completed', label: 'Completed' },
                ]}
              />
            </Form.Item>
            <Form.Item name='clientId' label='Client'>
              <Select
                placeholder='Select client'
                onChange={(value) => form.setFieldValue('clientId', value)}
                options={data.clients.map(({ id, name }: Client) => ({ value: id, label: name }))}
              />
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='primary' htmlType='submit' disabled={!data.clients.length}>
                Submit
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
}
