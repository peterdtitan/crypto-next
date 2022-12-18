import { usePageLoading } from '../hooks/usePageLoading';
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Progress from '../components/pageTransitions/Progress';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  const { isPageLoading } = usePageLoading();

  return (
    <>
     {isPageLoading ? (
      <SessionProvider session={session}>
        {getLayout( <Progress/>)}
      </SessionProvider>
     ) : (
      <SessionProvider session={session}>
        {getLayout( <Component {...pageProps} /> )}
      </SessionProvider>
     )

     }
    </>
  );
}
