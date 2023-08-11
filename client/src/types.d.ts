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
};
