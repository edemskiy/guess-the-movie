import { timeToAnswer } from "../constants/game";

const state = {
  question: {
    choises: [],
    imageURL: "",
    answer: ""
  },
  isQuestionLoading: true,
  score: 0,
  timer: timeToAnswer,
  startTime: Date.now(),
  answerIsGiven: false,
  showPopup: false
};

export default state;
