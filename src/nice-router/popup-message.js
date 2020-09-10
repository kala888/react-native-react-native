import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import _ from 'lodash'
import { Overlay } from 'teaset'
import device from './device'
import NavigationService from './navigation-service'
import { Button } from '@ant-design/react-native'

export default class PopupMessage extends React.PureComponent {
  static globalView = null

  static close() {
    if (PopupMessage.globalView) {
      PopupMessage.globalView.close()
    }
  }

  static show({ title, text, renderText, actionList = [], closeActionText = '关闭' }) {
    const actionsList = _.map(_.concat([{ title: closeActionText }], actionList), (it, index) => ({
      ...it,
      textStyle: { color: '#000' },
      style: {
        backgroundColor: '#FCD366',
        flex: 1,
        borderColor: 'rgba(111,111,111,0.5)',
        borderLeftWidth: index > 0 ? 1 : 0,
      },
      onPress: () => {
        if (it.onPress) {
          it.onPress()
        }
        NavigationService.view(it)
        PopupMessage.close()
      },
    }))

    const overlayView = (
      <Overlay.PopView
        style={{ alignItems: 'center', justifyContent: 'center' }}
        modal={false}
        overlayOpacity={0.5}
        ref={(v) => {
          PopupMessage.globalView = v
        }}
      >
        <View style={styles.container}>
          {!!title && (
            <View header style={[styles.titleContainer]}>
              <Text f20 style={{ color: 'black' }}>
                {title}
              </Text>
            </View>
          )}
          {renderText && renderText()}
          {!!text && (
            <View content style={styles.contentContainer}>
              <Text f20>{text}</Text>
            </View>
          )}

          <View footer style={styles.footerContainer}>
            {actionsList.map((it) => (
              <Button {...it} />
            ))}
          </View>
        </View>
      </Overlay.PopView>
    )
    Overlay.show(overlayView)
  }

  render() {
    return <TouchableOpacity onPress={() => PopupMessage.show(this.props)}>{this.props.children}</TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  container: {
    width: device.width - 40,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    minHeight: 100,
  },

  footerContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    marginBottom: -2,
    width: '100%',
    flexDirection: 'row',
  },
})
