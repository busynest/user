export declare const drawerSlice: import("@reduxjs/toolkit").Slice<{
    drawer: boolean;
}, {
    setDrawer: (state: {
        drawer: boolean;
    }) => void;
    closeDrawer: (state: {
        drawer: boolean;
    }) => void;
}, "drawers", "drawers", import("@reduxjs/toolkit").SliceSelectors<{
    drawer: boolean;
}>>;
export declare const setDrawer: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"drawers/setDrawer">, closeDrawer: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"drawers/closeDrawer">;
declare const _default: import("redux").Reducer<{
    drawer: boolean;
}>;
export default _default;
