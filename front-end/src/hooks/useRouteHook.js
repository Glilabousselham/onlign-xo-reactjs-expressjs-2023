import { useLocation } from "react-router-dom";

export function useRouteHook() {
    const { pathname } = useLocation()
    const reg = new RegExp("(^/)|(/$)", "g")
    return {
        /** @param {string} route  */
        isRoute: function (route) {
            return route.replace(reg, "") === pathname.replace(reg, "");
        }
    }
}