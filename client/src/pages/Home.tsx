import Clients from '../components/Clients';
import Projects from '../components/Projects';
import AddClientModal from '../components/AddClientModal';
import AddProjectModal from '../components/AddProjectModal';
import { Divider } from 'antd';

export default function Home() {
  return (
    <>
      <div style={{ display: 'flex', gap: 15, marginBottom: 40 }}>
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Divider>Projects</Divider>
      <Projects />
      <Divider>Clients</Divider>
      <Clients />
    </>
  );
}
