import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

import "../../node_modules/font-awesome/scss/font-awesome.scss";

import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";
import routes from "../route";

const AdminLayout = Loadable({
    loader: () => import("./layout/AdminLayout"),
    loading: Loader,
});

class App extends Component {
    state = {
        user: undefined,
    };

    componentDidMount() {
        onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                console.log("user logged", user);

                this.setState({ user });
            } else {
                console.info("not logged");
                this.setState({ user: undefined });
            }
        });
    }

    render() {
        const { user } = this.state;

        const menu = routes.map((route, index) => {
            return route.component ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => <route.component {...props} />}
                />
            ) : null;
        });

        return (
            <Aux>
                <ScrollToTop>
                    <Suspense fallback={<Loader />}>
                        <Switch>
                            {user ? (
                                <Route path="/" component={AdminLayout} />
                            ) : (
                                menu
                            )}
                        </Switch>
                    </Suspense>
                </ScrollToTop>
            </Aux>
        );
    }
}

export default App;
