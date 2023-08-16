import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { Button, Modal, Input, Form } from 'antd';

type FieldType = {
  name: string;
  email: string;
  phone: string;
};

export default function AddClientModal() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const [addClient] = useMutation(ADD_CLIENT, {
    update(cache, { data: { addClient } }) {
      const { clients }: any = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const onFinish = ({ name, email, phone }: FieldType) => {
    if (!name || !email || !phone) {
      alert('Please fill in all fields');
      return;
    }

    addClient({ variables: { name, email, phone } });
    form.resetFields();
    setOpen(false);
  };

  return (
    <>
      <Button type='primary' onClick={() => setOpen(true)} icon={<FaUser />}>
        Add Client
      </Button>
      {open && (
        <Modal
          title='Add Client'
          open={open}
          onCancel={() => setOpen(false)}
          footer={null}
          style={{ width: '100vw', overflow: 'hidden' }}
        >
          <Form onFinish={onFinish} layout='vertical' form={form}>
            <Form.Item style={{ margin: '20px 0' }} label='Name' name='name'>
              <Input placeholder='Enter name' />
            </Form.Item>
            <Form.Item label='Email' name='email' style={{ marginBottom: 20 }}>
              <Input type='email' placeholder='Enter email' />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  pattern: /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/,
                  message: 'Incorrect phone number',
                },
              ]}
              style={{ marginBottom: 20 }}
              label='Phone'
              name='phone'
            >
              <Input type='tel' placeholder='Enter phone number' />
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
}
