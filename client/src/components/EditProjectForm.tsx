import { useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutations';
import { Input, Button, Select, Form, Divider } from 'antd';

type Props = {
  project: Project;
};

type FieldType = {
  name: string;
  description: string;
  status: string;
};

export default function EditProjectForm({ project }: Props) {
  const [form] = Form.useForm();

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const onFinish = ({ name, description, status }: FieldType) => {
    if (!name || !description || !status) {
      return alert('Please fill out all fields');
    }

    updateProject({ variables: { id: project.id, name, description, status } });
  };

  const initialValues = {
    name: project.name,
    description: project.description,
    status: project.status,
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Divider>Update Project Details</Divider>
      <Form onFinish={onFinish} layout='vertical' initialValues={initialValues} form={form}>
        <Form.Item style={{ marginBottom: 10 }} label='Name' name='name'>
          <Input placeholder='Enter project name' />
        </Form.Item>
        <Form.Item style={{ marginBottom: 10 }} label='Description' name='description'>
          <Input.TextArea style={{ resize: 'none' }} placeholder='Enter description' />
        </Form.Item>
        <Form.Item style={{ marginBottom: 20 }} label='Status' name='status'>
          <Select
            onChange={(value) => form.setFieldValue('status', value)}
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
      </Form>
    </div>
  );
}
