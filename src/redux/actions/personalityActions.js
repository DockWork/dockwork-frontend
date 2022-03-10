import {personalityTest} from '../../config/config'
import {notification} from 'antd'

export const PERSONALITY_TEST_REQUEST = 'PERSONALITY_TEST_REQUEST'
export const PERSONALITY_TEST_SUCCESS = 'PERSONALITY_TEST_SUCCESS'
export const PERSONALITY_TEST_ERROR = 'PERSONALITY_TEST_ERROR'

const actions = {
  fillPersonalityTest: (data, history) => async (dispatch) => {
    dispatch({
      type: PERSONALITY_TEST_REQUEST,
    })
    await personalityTest(data).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: PERSONALITY_TEST_SUCCESS,
          payload: {
            data: res.data.data,
            message: res.data.message,
          },
        })
        history.push('/js/dashboard')
      } else {
        dispatch({
          type: PERSONALITY_TEST_ERROR,
        })
        notification['error']({
          message: 'Test Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },
}

export default actions
