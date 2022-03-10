import {PERSONALITY_TEST_REQUEST, PERSONALITY_TEST_SUCCESS, PERSONALITY_TEST_ERROR} from '../actions/personalityActions'

const initialState = {
  personalityTestData: [],
  personalityTestLoading: false,
}

function personality(state = initialState, action) {
  switch (action.type) {
    case PERSONALITY_TEST_REQUEST:
      return Object.assign({}, state, {
        personalityTestLoading: true,
        personalityTestData: [],
      })
    case PERSONALITY_TEST_SUCCESS:
      return Object.assign({}, state, {
        personalityTestLoading: false,
        personalityTestData: action.payload.data,
      })
    case PERSONALITY_TEST_ERROR:
      return Object.assign({}, state, {
        personalityTestLoading: false,
        personalityTestData: [],
      })

    default:
      return state
  }
}

export default personality
