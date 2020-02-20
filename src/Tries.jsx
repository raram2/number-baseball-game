import React, {PureComponent} from 'react';

// class 문법시 - PureComponent
export default class Tries extends PureComponent {
  render() {
    console.log('Try 컴포넌트가 렌더링되었습니다.');
    return (
      <li>
        <div>시도: {this.props.tryInfo.try}</div>
        <div>결과: {this.props.tryInfo.result}</div>
      </li>
    );
  }
}

// 함수 문법시 - React.memo API로 함수 감싸기(1)
// export const Tries = React.memo(({tryInfo}) => {
//   console.log('Try 컴포넌트가 렌더링되었습니다.');
//   return (
//     <li>
//       <div>시도: {tryInfo.try}</div>
//       <div>결과: {tryInfo.result}</div>
//     </li>
//   );
// });

// 함수 문법시 - React.memo API로 함수 감싸기(2)
// const Tries = ({tryInfo}) => {
//   console.log('Try 컴포넌트가 렌더링되었습니다.');
//   return (
//     <li>
//       <div>시도: {tryInfo.try}</div>
//       <div>결과: {tryInfo.result}</div>
//     </li>
//   );
// };
// export default Tries;
// const MemorizedTries = React.memo(Tries);
// export default MemorizedTries;
