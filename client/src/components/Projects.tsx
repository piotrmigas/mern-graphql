import { Watch } from 'react-loader-spinner';
import { useQuery } from '@apollo/client';
import ProjectCard from './ProjectCard';
import { GET_PROJECTS } from '../queries/projectQueries';
import { Row, Empty } from 'antd';

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Watch width={25} wrapperStyle={{ display: 'flex', justifyContent: 'center' }} />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {data.projects.length > 0 ? (
        <Row gutter={[24, 24]}>
          {data.projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Row>
      ) : (
        <Empty description={<span>No Projects</span>} />
      )}
    </>
  );
}
