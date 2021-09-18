declare module 'onvif' {
  interface ICamOptions {
    hostname: string;
    username: string;
    password: string;
    port: string;
  }

  interface IGetSnapshotUriOptions {
    profileToken?: string;
  }
  interface IGetSnapshotUriResult {
    uri: string;
  }

  type IGetProfilesResult = Array<{
    $: { token: string; fixed: boolean };
    name: string;
    videoSourceConfiguration: {
      $: { token: string };
      name: string;
      useCount: number;
      sourceToken: string;
      bounds: {
        $: { x: number; y: number; width: number; height: number };
      };
    };
    audioSourceConfiguration: {
      $: { token: string };
      name: string;
      useCount: number;
      sourceToken: string;
    };
    videoEncoderConfiguration: {
      $: { token: string; GovLength: number; Profile: string };
      name: string;
      useCount: number;
      encoding: string;
      resolution: { width: number; height: number };
    };
  }>;

  interface IGetStreamUriOptions {
    profileToken?: string;
  }
  interface IGetStreamUriResult {
    uri: string;
  }

  class Cam {
    constructor(options: ICamOptions);

    connect: (callback: (err: string, data: null, xml: string) => void) => void;

    getProfiles: (callback: (err: string, profiles: IGetProfilesResult, xml: string) => void) => void;
    getSnapshotUri: (options: IGetSnapshotUriOptions, callback: (err: string, data: IGetSnapshotUriResult) => void) => void;
    getStreamUri: (options: IGetStreamUriOptions, callback: (err: string, data: IGetStreamUriResult) => void) => void;
  }
}
