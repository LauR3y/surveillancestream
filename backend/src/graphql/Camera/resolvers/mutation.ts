import CameraRepository from '../../../repositories/Camera';

const createCamera = (_parent: unknown, variables: { name: string; host: string; username: string; password: string; port: string }) => {
  return CameraRepository.create(variables.name, variables.host, variables.username, variables.password, variables.port);
};

const Mutation = {
  createCamera,
};

export default Mutation;
