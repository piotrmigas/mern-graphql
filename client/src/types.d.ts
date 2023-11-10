type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  status: string;
  client: Client;
  clientId: string;
};

interface DataType {
  key: string;
  id: string;
  name: number;
  email: string;
  phone: string;
}
