import PageHeader from 'components/PageHeader';
import ContentWrapper from 'containers/BaseWrappers/ContentWrapper';
import FeedxRoutes from 'FeedxRoutes';
import { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import { configRootStore } from 'services/config-root-state';
import { MobxRootState } from 'store/mst';
import { MobxRootStateProvider } from 'store/mst/root-state-context';
import './index.css';

function App() {
  // @ts-ignore this verbose check
  const [rootState, setRootState] = useState<MobxRootState>({})

  // Initial async loading actions, MobxRootState
  useEffect(() => {
    ; (async () => {
      await configRootStore().then(setRootState)
    })()
  }, [])

  // useEffect(() => {
  //   const currentToken = auth.getToken();

  //   const renewToken = async () => {
  //     try {
  //       const {
  //         data: { token },
  //       } = await request('/admin/renew-token', {
  //         method: 'POST',
  //         body: { token: currentToken },
  //       });
  //       auth.updateToken(token);
  //     } catch (err) {
  //       // Refresh app
  //       auth.clearAppStorage();
  //       window.location.reload();
  //     }
  //   };

  //   if (currentToken) {
  //     renewToken();
  //   }
  // }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const { data } = await request('/admin/init', { method: 'GET' });

  //       const { uuid } = data;

  //       if (uuid) {
  //         try {
  //           fetch('https://analytics.strapi.io/track', {
  //             method: 'POST',
  //             body: JSON.stringify({
  //               event: 'didInitializeAdministration',
  //               uuid,
  //             }),
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //           });
  //         } catch (e) {
  //           // Silent.
  //         }
  //       }

  //       getDataRef.current(data);
  //       setState({ isLoading: false, hasAdmin: data.hasAdmin });
  //     } catch (err) {
  //       strapi.notification.toggle({
  //         type: 'warning',
  //         message: { id: 'app.containers.App.notification.error.init' },
  //       });
  //     }
  //   };

  //   getData();
  // }, []);

  // if (isLoading) {
  //   return <LoadingIndicatorPage />;
  // }

  return (
    <MobxRootStateProvider value={rootState}>
      <PageHeader />
      <ContentWrapper>
        <Switch>
          <FeedxRoutes />
        </Switch>
      </ContentWrapper>
    </MobxRootStateProvider>
  );
}

export default App;
