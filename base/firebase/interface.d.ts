export declare function takeAuthFailure(): {
    code: string;
    message: string;
} | null;
/** @deprecated Use closeDrawer(). Removed in 4.0.0. This only closes the drawer. */
export declare const pwaDrawerToggle: () => void;
export declare const reauthenticate: (password: string) => Promise<boolean>;
export declare const logOut: () => Promise<void>;
export declare const logAccount: () => Promise<void>;
export declare const logAccountDelete: () => Promise<void>;
export declare const deleteUserFiles: (uid: string) => Promise<void>;
export declare const deleteDocument: (collect: string, item: string) => Promise<void>;
//# sourceMappingURL=interface.d.ts.map