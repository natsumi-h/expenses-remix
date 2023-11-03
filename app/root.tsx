import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useMatches,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import sharedStyles from "./styles/shared.css";
import Error from "./components/util/Error";

type DocumentProps = {
  title?: string | number;
  children: React.ReactNode;
};

function Document({ children }: DocumentProps) {
  const matches: any = useMatches();
  const disableJs = matches.some((match: any) => match.handle?.disableJs);

  return (
    <html lang="en">
      <head>
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body>
        {/* <MainHeader /> */}
        {/* <Outlet /> */}
        {children}
        <ScrollRestoration />
        {!disableJs && <Scripts />}
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error: any = useRouteError();

  if (isRouteErrorResponse(error)) {
    // stringfy number
    const status = error.status.toString();
    return (
      <Document title={status}>
        <main>
          <Error title={status}>
            <p>{error.data}</p>
            <p>
              Back to <Link to="/">safety</Link>
            </p>
          </Error>
        </main>
      </Document>
    );
  } else if (error) {
    return (
      <Document title={error.status}>
        <main>
          <Error title={error.status}>
            <p>{error.message}</p>
            <p>
              Back to <Link to="/">safety</Link>
            </p>
          </Error>
        </main>
      </Document>
    );
  } else {
    return (
      <Document title="Something went wrong">
        <main>
          <Error title="Something went wrong">
            <p>Something went wrong!</p>
            <p>
              Back to <Link to="/">safety</Link>
            </p>
          </Error>
        </main>
      </Document>
    );
  }
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: sharedStyles },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Root | Remix" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
};
