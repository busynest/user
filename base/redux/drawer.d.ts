export declare const drawerSlice: import("@reduxjs/toolkit").Slice<{
    drawer: boolean;
}, {
    setDrawer: (state: import("immer").WritableDraft<{
        drawer: boolean;
    }>) => void;
    closeDrawer: (state: import("immer").WritableDraft<{
        drawer: boolean;
    }>) => void;
}, "drawers", "drawers", import("@reduxjs/toolkit").SliceSelectors<{
    drawer: boolean;
}>>;
export declare const setDrawer: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"drawers/setDrawer">, closeDrawer: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"drawers/closeDrawer">;
declare const _default: import("redux").Reducer<{
    drawer: boolean;
}>;
export default _default;
