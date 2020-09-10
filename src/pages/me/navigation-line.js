import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'
import TouchableOpacity from 'teaset/components/ListRow/TouchableOpacity'
import NavigationService from '@/nice-router/navigation-service'
import _ from 'lodash'
import colors from '@/utils/colors'
import ActionIcon from '../../components/action-icon'
import ActionUtil from '@/nice-router/action-util'

export default function NavigationLine(props) {
  const { icon, iconSize, title, brief = '', disabled, bordered = true, onPress } = props

  const handlePress = () => {
    if (onPress) {
      onPress()
      return
    }
    NavigationService.safeView(props)
  }

  const hasMore = ActionUtil.isActionLike(props)

  const Wrapper = !hasMore || disabled ? View : TouchableOpacity

  return (
    <View style={styles.line}>
      <ActionIcon icon={icon} color={colors.primaryColor} size={iconSize} />
      <Wrapper style={[styles.body, bordered ? styles.bordered : {}]} onPress={handlePress}>
        <Text style={styles.title}>{title}</Text>
        {_.isString(brief) ? <Text style={styles.brief}>{brief}</Text> : brief}
        {hasMore && <Icon name='right' style={styles.moreIcon} />}
      </Wrapper>
    </View>
  )
}

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    paddingRight: 5,
    flex: 1,
    height: 44,
    alignItems: 'center',
    marginLeft: 10,
    paddingLeft: 0,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: colors.textColorLight,
  },
  brief: {
    fontSize: 14,
    paddingRight: 10,
    color: '#888',
  },

  moreIcon: {
    alignSelf: 'center',
    color: '#ccc',
  },
})
