import CameraRepository from '../../../repositories/Camera';

const camera = async (_parent: unknown, args: { id: number; useProxy: boolean }) => {
  const camera = await CameraRepository.getById(args.id);

  const profiles = await CameraRepository.getProfiles(args.id);

  if (args.useProxy) {
    profiles?.profiles.map((p) => {
      p.snapshotUri = `/proxy/snapshot?id=${args.id}`;
      p.streamUri = `/proxy/stream?id=${args.id}`;
    });
  }

  return { ...camera?.get(), profiles: profiles?.profiles };
};

const cameras = async () => {
  return CameraRepository.getAll();
};

const Query = {
  camera,
  cameras,
};

export default Query;
