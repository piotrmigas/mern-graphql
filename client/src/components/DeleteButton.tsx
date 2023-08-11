import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';
import { DELETE_PROJECT } from '../mutations/projectMutations';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

type Props = {
  item: Client | Project;
};

export default function DeleteButton({ item }: Props) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: item.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: item.id },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <Button
      type='primary'
      icon={<FaTrash />}
      onClick={() => (item.hasOwnProperty('client') ? deleteProject() : deleteClient())}
      danger
    />
  );
}
