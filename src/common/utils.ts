import fs from 'fs/promises';

export type Dictionary<T> = {
  [key: string]: T;
};

export type PackageJson = Dictionary<string>;

export async function loadPackageJson(path: string): Promise<any> {
  const content = await fs.readFile(path, { encoding: 'utf-8' });
  return JSON.parse(content);
}
