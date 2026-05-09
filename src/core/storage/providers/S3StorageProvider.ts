import { StorageProviderInterface } from "./StorageProvider.interface";
export class S3StorageProvider implements StorageProviderInterface {
  async upload(_file: File, _path: string) { return ""; }
  async delete(_path: string) {}
  getUrl(_path: string) { return ""; }
}
