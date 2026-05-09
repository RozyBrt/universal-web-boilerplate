export interface StorageProviderInterface {
  upload(file: File, path: string): Promise<string>;
  delete(path: string): Promise<void>;
  getUrl(path: string): string;
}
