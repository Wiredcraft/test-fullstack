export function createRouteHandler(routes, history, store) {
    let arrayOfTheRoutes = [];
    _(routes).each((handler, route) => {
        arrayOfTheRoutes.push([new RegExp(route), handler]);
    }).value();
    history.listen(location => {
        //when directly visit the rule will dispatch a action in routes
        if (location.action === 'POP' || location.action === 'PUSH') {
            let route = _(arrayOfTheRoutes).find((r) => {
                return r[0].test(location.pathname)
            });
            if (route) {
                route[1].call(this, store.dispatch, store.getState(), location);
            }
        }
    })
}

