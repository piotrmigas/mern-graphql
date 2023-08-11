import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';
import { Divider, List } from 'antd';

type Props = {
  client: Client;
};

export default function ClientInfo({ client }: Props) {
  const data = [
    { icon: <FaIdBadge />, text: client.name },
    { icon: <FaEnvelope />, text: client.email },
    { icon: <FaPhone />, text: client.phone },
  ];

  return (
    <>
      <Divider>Client Information</Divider>
      <List
        itemLayout='horizontal'
        dataSource={data}
        renderItem={({ icon, text }) => (
          <List.Item>
            <List.Item.Meta avatar={icon} title={text} />
          </List.Item>
        )}
      />
    </>
  );
}
