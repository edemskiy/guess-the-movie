import InitialState from "../states/game";
import { timeToAnswer, Events } from "../constants/game";

const game = function(state = InitialState, action) {
  switch (action.type) {
    case Events.changeQuestion:
      return { ...state, question: action.payload };
    case Events.changeQuestionLoadingStatus:
      return { ...state, isQuestionLoading: action.payload };
    case Events.incrementScore:
      return { ...state, score: state.score + 1 };
    case Events.updateTimer:
      return {
        ...state,
        timer: timeToAnswer - (Date.now() - state.startTime) / 1000
      };
    case Events.setStartTime:
      return { ...state, startTime: action.payload };
    case Events.changeAnswerIsGivenStatus:
      return { ...state, answerIsGiven: action.payload };
    case Events.changeShowPopupStatus:
      return { ...state, showPopup: action.payload };
    case Events.resetGame:
      return InitialState;
    default:
      return state;
  }
};

export default game;
