import { useState, FormEvent } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { Button, Modal, Input } from 'antd';

export default function AddClientModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === '' || email === '' || phone === '') {
      return alert('Please fill in all fields');
    }

    addClient();

    setName('');
    setEmail('');
    setPhone('');
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
          <form onSubmit={onSubmit}>
            <div style={{ margin: '20px 0' }}>
              <label>Name</label>
              <Input onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label>Email</label>
              <Input onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label>Phone</label>
              <Input onChange={(e) => setPhone(e.target.value)} value={phone} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
