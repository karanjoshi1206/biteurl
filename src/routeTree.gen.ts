/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as AuthImport } from './routes/auth'
import { Route as IdImport } from './routes/$id'
import { Route as IndexImport } from './routes/index'
import { Route as LinkIdImport } from './routes/link/$id'

// Create/Update Routes

const DashboardRoute = DashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const IdRoute = IdImport.update({
  path: '/$id',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const LinkIdRoute = LinkIdImport.update({
  path: '/link/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/$id': {
      id: '/$id'
      path: '/$id'
      fullPath: '/$id'
      preLoaderRoute: typeof IdImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/link/$id': {
      id: '/link/$id'
      path: '/link/$id'
      fullPath: '/link/$id'
      preLoaderRoute: typeof LinkIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  IdRoute,
  AuthRoute,
  DashboardRoute,
  LinkIdRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/$id",
        "/auth",
        "/dashboard",
        "/link/$id"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/$id": {
      "filePath": "$id.tsx"
    },
    "/auth": {
      "filePath": "auth.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx"
    },
    "/link/$id": {
      "filePath": "link/$id.tsx"
    }
  }
}
ROUTE_MANIFEST_END */