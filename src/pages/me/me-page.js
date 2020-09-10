import React from 'react'
import { ScrollView, StatusBar, StyleSheet, Text } from 'react-native'
import colors from '@/utils/colors'
import { units } from '@/utils/index'
import { useFocusEffect } from '@react-navigation/native'

export default function MePage() {
  useFocusEffect(
    React.useCallback(() => {
      return () => {}
    }, [])
  )

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={colors.primaryColor} barStyle='dark-content' />

      <Text>me</Text>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    minHeight: units.vh * 80,
  },
})
