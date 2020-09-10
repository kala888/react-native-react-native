import React from 'react'

import { ScrollView, StatusBar, StyleSheet, Text } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { units } from '@/utils/index'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/utils/colors'

export default function HomePage() {
  useFocusEffect(
    React.useCallback(() => {
      return () => {}
    }, [])
  )

  return (
    <SafeAreaView style={styles.homePage} edges={['top']} mode='padding'>
      <StatusBar backgroundColor={colors.primaryColor} barStyle='dark-content' />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text>1111</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  homePage: {
    backgroundColor: colors.primaryColor,
    minHeight: 95 * units.vh,
  },

  container: {
    backgroundColor: '#fff',
  },
  content: {},

  header: {
    width: '100%',
    position: 'relative',
    minHeight: 30 * units.vh,
  },

  headerBg: {
    width: '100%',
    height: '80%',
    maxHeight: 65 * units.vh,
    position: 'absolute',
  },

  headerText: {
    fontSize: 22,
    paddingHorizontal: 20,
    paddingTop: 10,
    color: '#302E30',
  },
})
