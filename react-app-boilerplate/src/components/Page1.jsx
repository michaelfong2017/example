import React, { lazy, Suspense } from "react"

import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Spinner from "components/Spinner"

const Test = lazy(() => import("./Test"))

const Home = () => {
    return (
        <div style={{ minHeight: "75vh" }}>
            <Suspense fallback={<Spinner />}>
                <Switch>
                    {/* <Route exact path='/' component={Navbar} /> */}
                    <Route path='/page-1/test' component={Test} />
                    {/* <Route path='/page-1/test2' component={Test2} /> */}

                    <Route exactpath='/page-1'>
                        <Redirect to='/page-1/test' />
                    </Route>
                </Switch>
            </Suspense>
        </div>
    )
}

export default Home