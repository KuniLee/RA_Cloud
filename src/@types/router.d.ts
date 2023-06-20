import 'vue-router'

// To ensure it is treated as a module, add at least one `export` statement
export {}

declare module 'vue-router' {
  interface RouteMeta {
    // is optional
    layout?: string
    // must be declared by every route
    auth: boolean
  }
}
