import { Request, Response } from 'express';

import CameraRepository from '../repositories/Camera';
import AxiosDigestAuth from './AxiosDigestAuth';

const snapshot = async (req: Request, res: Response) => {
  if (req.query && typeof req.query.id === 'string') {
    const camera = await CameraRepository.getById(parseInt(req.query.id, 10));

    if (camera) {
      const profiles = await CameraRepository.getProfiles(parseInt(req.query.id, 10));
      if (profiles && profiles.length > 0) {
        const digestAuth = new AxiosDigestAuth({
          username: camera.username,
          password: camera.password,
        });

        const response = await digestAuth.request({
          headers: {
            Accept: '*/*',
          },
          method: 'GET',
          url: profiles[1].snapshotUri,
          responseType: 'arraybuffer',
        });

        if (response.status === 200) {
          res.setHeader('Content-Type', 'image/jpeg');
          res.setHeader('Content-Transfer-Encoding', 'binary');
          res.send(response.data);
          res.end();
          return;
        }
      }
    }
  }

  res.writeHead(400);
  res.end();
};

export default snapshot;
