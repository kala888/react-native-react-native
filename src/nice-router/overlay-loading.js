import React from 'react'
import { ModalIndicator, Overlay } from 'teaset'

let miKey = null
let miOverlay = null

export default class OverlayLoading extends Overlay {
  static IndicatorView = ModalIndicator.IndicatorView

  static showLoadingModal(text) {
    if (miOverlay) {
      miOverlay.text = text
      return
    }
    if (miKey) {
      return
    }
    miKey = super.show(
      <this.IndicatorView
        text={text}
        ref={(v) => {
          miOverlay = v
        }}
      />
    )
  }

  static hideLoadingModal() {
    if (miKey) {
      super.hide(miKey)
      miKey = null
      miOverlay = null
    }
  }
}
