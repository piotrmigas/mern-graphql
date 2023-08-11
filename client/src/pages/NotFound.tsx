import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
      }}
    >
      <FaExclamationTriangle size='5em' style={{ color: 'orange' }} />
      <h1>404</h1>
      <p>Sorry, this page does not exist</p>
      <Link to='/'>Go Back</Link>
    </div>
  );
}
