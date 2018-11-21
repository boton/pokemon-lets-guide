import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import { log } from '../common/utils/logger';
import registerServiceWorker from './utils/service-worker';

import * as routes from '../constants/appRoutes';
import { restoreLastRoute } from '../constants/features';

import AppView from './app-view';
import PokemonListWrapper from './modules/pokemon-list/pokemon-list-wrapper';

import { RootState } from './root.types';
import { setLastSession, setStore } from '../common/utils/idb';

const packageJson = require('../../package.json');
const appVersion = packageJson.version;

interface CustomStore extends RootState {
  [index: string]: any;
}

interface OwnProps {
  lastRoute: string;
  isNewRelease: boolean;
}

type RouteProps = RouteComponentProps<{
  location: any;
}>;

interface StateProps {
  store: CustomStore;
}

type Props = OwnProps & RouteProps & StateProps;

class AppWrapper extends React.Component<Props> {
  static displayName = 'AppWrapper';

  state = {};

  componentDidMount() {
    const { lastRoute, history } = this.props;

    if (restoreLastRoute && lastRoute) {
      history.push({
        pathname: lastRoute,
        state: {
          from: this.props.location,
          isInitial: true,
        },
      });
    }

    // Init the service worker
    registerServiceWorker(history);
  }

  componentDidUpdate(prevProps: Props) {
    const { location } = this.props;

    this.persistStore();

    // On URL change, update lastSession.route
    if (prevProps.location.pathname !== location.pathname) {
      setLastSession({
        version: appVersion,
        route: location.pathname,
      });
    }
  }

  persistStore = () => {
    const { store } = this.props;

    const ignoredStates = ['account', 'contact', 'feedback', 'form', 'notifier', 'uploader'];

    log('Persisting new store');
    const cleanState: { [index: string]: any } = {};
    Object.keys(store).forEach(key => {
      if (ignoredStates.indexOf(key) < 0) {
        cleanState[key] = {
          ...store[key],
          isFetching: undefined,
          filters: undefined,
        };
      }
    });

    setStore(JSON.parse(JSON.stringify(cleanState)));
  };

  render() {
    return (
      <AppView>
        <Switch>
          <Route path={routes.HOME} component={PokemonListWrapper} />
        </Switch>
      </AppView>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  const store = state as CustomStore;

  return {
    store,
  };
};

const connectedApp = withRouter(connect(mapStateToProps)(AppWrapper));

export default hot(module)(connectedApp);