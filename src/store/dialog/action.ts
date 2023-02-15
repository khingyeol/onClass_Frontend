import { OCDialogProps } from "../../common/OCDialog";

export interface DialogInterface extends Omit<OCDialogProps, 'open'> {
    id: string;
    isShow: boolean;
}


export enum DialogActionType {
    DisplayDialog = "DISPLAY_DIALOG",
    HideDialog = "HIDE_DIALOG",
}

export interface DisplayDialogAction {
    type: DialogActionType.DisplayDialog;
    payload: DialogInterface
}

export interface HideDialogAction {
    type: DialogActionType.HideDialog;
}

export type DialogAction = DisplayDialogAction | HideDialogAction;

export const displayDialog = (dialogProps: DialogInterface): DisplayDialogAction => {
    return {
        type: DialogActionType.DisplayDialog,
        payload: dialogProps
    };
}

export const hideDialog = (): HideDialogAction => {
    return { type: DialogActionType.HideDialog };
}