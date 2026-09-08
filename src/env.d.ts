/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_APPLICATION_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
