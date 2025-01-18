/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_DOMAIN_HOST :string
    readonly VITE_TIMEOUT :number
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }