import { Col, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const navigate = useNavigate();

  return (
    <Col span={8}>
      <Card
        title={project.name}
        extra={
          <Button type='primary' onClick={() => navigate(`/projects/${project.id}`)} ghost>
            View
          </Button>
        }
      >
        <p>
          Status: <strong>{project.status}</strong>
        </p>
      </Card>
    </Col>
  );
}
