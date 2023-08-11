import { Link, useParams } from 'react-router-dom';
import { Watch } from 'react-loader-spinner';
import ClientInfo from '../components/ClientInfo';
import DeleteButton from '../components/DeleteButton';
import EditProjectForm from '../components/EditProjectForm';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { Card, Divider } from 'antd';

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Watch width={25} wrapperStyle={{ display: 'flex', justifyContent: 'center' }} />;
  if (error) return <p>Something Went Wrong</p>;

  const { project } = data;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {!loading && !error && (
        <Card style={{ width: 600 }}>
          <Link to='/' style={{ float: 'right' }}>
            Back
          </Link>
          <h1>{project.name}</h1>
          <Divider>Description</Divider>
          <p>{project.description}</p>
          <Divider>
            Project status: <span style={{ fontWeight: 'normal' }}>{project.status}</span>
          </Divider>
          <ClientInfo client={project.client} />
          <EditProjectForm project={project} />
          <div style={{ float: 'right' }}>
            <DeleteButton item={project} />
          </div>
        </Card>
      )}
    </div>
  );
}
