/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_FOOTBALL_API_BASE: string;
  readonly VITE_FOOTBALL_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}