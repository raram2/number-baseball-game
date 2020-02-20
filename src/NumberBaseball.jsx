// node_modules에서 리액트 module 불러오기 - import 방식(사실 웹팩환경에서는 부적합)
import React, {PureComponent, createRef} from 'react';
import Tries from './Tries';

function getDifferentFourNumbs() {
  const numbs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let result = [];
  for (let i = 0; i < 4; i++) {
    let pickedNumb = numbs.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    result.push(pickedNumb);
  }
  return result;
}

class NumberBaseball extends PureComponent {
  state = {
    realNumb: getDifferentFourNumbs().join(''),
    guessNumb: '',
    result: '',
    tries: [],
  };
  textInput = createRef();
  // NumberBaseball Prototype Methods
  onChangeInput = e => {
    this.setState({guessNumb: e.target.value});
  };
  onSubmitForm = e => {
    e.preventDefault();
    if (this.state.guessNumb === this.state.realNumb) {
      // 정답일 때 -
      this.setState(prevState => {
        // 콜백으로 작성시 여기에 다른 동작 작성 가능
        return {
          result: '홈런!',
          tries: [...prevState.tries, {try: prevState.guessNumb, result: '홈런!'}],
        };
      });
      alert('게임을 다시 시작합니다.');
      this.setState({
        guessNumb: '',
        realNumb: getDifferentFourNumbs().join(''),
        result: '',
        tries: [],
      });
    } else {
      // 틀렸을 때 -
      let stringedGuessNumb = String(this.state.guessNumb);
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        // 틀렸을 때 - 10회 이상 시
        this.setState({
          result: `실패! 10번 넘게 틀렸습니다. 정답은 ${this.state.realNumb}였습니다.`,
        });
        setTimeout(() => {
          alert('게임을 다시 시작합니다.');
          this.setState({
            guessNumb: '',
            realNumb: getDifferentFourNumbs().join(''),
            result: '',
            tries: [],
          });
        }, 1000);
      } else {
        // 틀렸을 때 - 10회 미만 시
        for (let i = 0; i < 4; i++) {
          if (stringedGuessNumb[i] === this.state.realNumb[i]) {
            strike++;
          } else if (this.state.realNumb.includes(stringedGuessNumb[i])) {
            ball++;
          }
        }
        this.setState({
          result: `${strike}S ${ball}B`,
          tries: [...this.state.tries, {try: this.state.guessNumb, result: `${strike}S${ball}B`}],
          guessNumb: '',
        });
      }
    }
    this.textInput.current.focus();
  };
  render() {
    console.log('렌더링 되었습니다.');
    return (
      <>
        <h1>숫자야구 게임</h1>
        <form onSubmit={this.onSubmitForm} autoComplete='off'>
          <label htmlFor='numInput'>4자리 숫자를 입력하세요.</label>
          <input
            type='text'
            name='numInput'
            maxLength={4}
            ref={this.textInput}
            value={this.state.guessNumb}
            onChange={this.onChangeInput}
          />
          <button type='submit'>입력</button>
        </form>
        <div>{this.state.result}</div>
        <div>시도 : {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((val, idx) => {
            // 다른 컴포넌트에 attribute 처럼 넣어 전달해주는 것을 props라고 함
            // 리스트 아이템으로 들어가는 컴포넌트의 경우 무조건 key prop를 넣어줘야하며, 값은 문자열이 되어야 접근,수정,삭제가 쉽다.
            return <Tries key={`${idx + 1}th Try`} tryInfo={val} index={idx} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;
