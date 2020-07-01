import { ActionTree } from 'vuex'
import { IDialogState, IDialog, IDialogItem } from './types'

export const actions: ActionTree<IDialogState, object> = {
  openDialog({ commit, dispatch }, { dialog }: { dialog: IDialog }) {
    return new Promise((resolve, reject) => {
      const dialogItem: IDialogItem = {
        dialog,
        resolve,
        reject
      }

      commit('addDialogItem', dialogItem)
    })
  },

  resolveDialog(
    { commit, getters, dispatch },
    { dialog, value }: { dialog: IDialog; value?: any }
  ) {
    const targetContainer: IDialogItem | undefined = getters[
      'dialogItemByDialog'
    ](dialog)

    if (targetContainer) {
      if (targetContainer.resolve) targetContainer.resolve(value)

      if (dialog.resolve) dialog.resolve()

      commit('removeDialogItem', targetContainer)
    }
  },

  rejectDialog(
    { commit, getters, dispatch },
    { dialog, reason }: { dialog: IDialog; reason?: any }
  ) {
    const targetContainer: IDialogItem | undefined = getters[
      'dialogItemByDialog'
    ](dialog)

    if (targetContainer) {
      if (targetContainer.reject) targetContainer.reject(reason)

      if (dialog.reject) dialog.reject()

      commit('removeDialogItem', targetContainer)
    }
  }
}
