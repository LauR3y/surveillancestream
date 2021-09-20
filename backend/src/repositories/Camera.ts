import { Cam, IGetProfilesResult, IGetStreamUriResult } from 'onvif';

import Camera from './../models/Camera';

const CameraRepository = {
  create: async (name: string, hostname: string, username: string, password: string, port: string) => {
    return await Camera.create({
      name,
      hostname,
      username,
      password,
      port,
    });
  },

  getById: async (id: number) => {
    return Camera.findOne({ where: { id } });
  },

  getAll: async () => {
    return Camera.findAll();
  },

  getProfiles: async (id: number) => {
    const camera = await Camera.findOne({ where: { id } });

    if (camera) {
      const cam = new Cam({
        hostname: camera.hostname,
        username: camera.username,
        password: camera.password,
        port: camera.port,
        // timeout: 10000,
        // preserveAddress: true   // Enables NAT support and re-writes for PullPointSubscription URL
      });

      const connect = () => {
        return new Promise<void>((resolve, reject) => {
          cam.connect((err) => {
            if (err) {
              console.error(err);
              reject(err);
            }
            resolve();
          });
        });
      };

      const getProfiles = () => {
        return new Promise<IGetProfilesResult>((resolve, reject) => {
          cam.getProfiles((err, data) => {
            if (err) {
              reject(err);
            }
            resolve(data);
          });
        });
      };

      const getSnapshotUri = (profileToken: string) => {
        return new Promise<{ uri: string }>((resolve, reject) => {
          cam.getSnapshotUri({ profileToken }, (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(data);
          });
        });
      };

      const getStreamUri = (profileToken: string) => {
        return new Promise<IGetStreamUriResult>((resolve, reject) => {
          cam.getStreamUri({ profileToken }, (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(data);
          });
        });
      };

      // connect to camera
      await connect();

      // get profiles
      const profiles = await getProfiles();

      // get snapshot and stream uris
      const uris: {
        [key: string]: {
          snapshot: { uri: string };
          stream: { uri: string };
        };
      } = {};
      for (let i = 0; i < profiles.length; i++) {
        uris[profiles[i].$.token] = {
          snapshot: await getSnapshotUri(profiles[i].$.token),
          stream: await getStreamUri(profiles[i].$.token),
        };
      }

      return {
        profiles: profiles.map((p) => ({
          name: p.name,
          token: p.$.token,
          video: {
            profile: p.videoEncoderConfiguration.$.Profile,
            encoding: p.videoEncoderConfiguration.encoding,
            resolution: p.videoEncoderConfiguration.resolution,
          },
          snapshotUri: uris[p.$.token].snapshot.uri,
          streamUri: uris[p.$.token].stream.uri,
        })),
      };
    }
  },
};

export default CameraRepository;
