import { useQuery } from '@apollo/client';
import { Watch } from 'react-loader-spinner';
import { GET_CLIENTS } from '../queries/clientQueries';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import DeleteButton from './DeleteButton';

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Watch width={25} wrapperStyle={{ display: 'flex', justifyContent: 'center' }} />;
  if (error) return <div style={{ display: 'flex', justifyContent: 'center' }}>Something Went Wrong</div>;

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    { render: (param) => <DeleteButton item={param} /> },
  ];

  const { clients } = data;

  const dataSource: DataType[] = clients.map((client: Client) => ({ ...client, key: client.id }));

  return (
    <>
      {!loading && !error && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <Table columns={columns} dataSource={dataSource} style={{ width: '80%' }} />
        </div>
      )}
    </>
  );
}
