interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
