import { Events } from "../constants/game";

export const changeQuestion = question => ({
  type: Events.changeQuestion,
  payload: question
});

export const changeQuestionLoadingStatus = status => ({
  type: Events.changeQuestionLoadingStatus,
  payload: status
});

export const incrementScore = () => ({
  type: Events.incrementScore
});

export const updateTimer = () => ({
  type: Events.updateTimer
});

export const setStartTime = dateTime => ({
  type: Events.setStartTime,
  payload: dateTime
});

export const changeAnswerIsGivenStatus = answerIsGiven => ({
  type: Events.changeAnswerIsGivenStatus,
  payload: answerIsGiven
});

export const changeShowPopupStatus = showPopup => ({
  type: Events.changeShowPopupStatus,
  payload: showPopup
});

export const resetGame = () => ({
  type: Events.resetGame
});
