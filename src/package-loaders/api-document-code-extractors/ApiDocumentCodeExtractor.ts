export interface ApiDocumentCodeExtractor {
  extract(path: string): Promise<Array<string>>;
}
