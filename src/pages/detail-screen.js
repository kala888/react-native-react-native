import React from 'react'
import { Button, Text, View } from 'react-native'
import { connect } from 'react-redux'

function DetailScreen({ navigation, dispatch, detail }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>detail:{JSON.stringify(detail)}</Text>
      <Button onPress={() => dispatch({ type: 'detail/plus' })} title={'++'} />
      <Button onPress={() => navigation.navigate('HomePage')} title={'go Home'} />
      <Button onPress={() => navigation.navigate('MePage')} title={'go Me'} />
      <Button onPress={() => navigation.navigate('Detail2')} title={'go detail 222'} />
    </View>
  )
}

export default connect(({ detail }) => ({ detail }))(DetailScreen)
