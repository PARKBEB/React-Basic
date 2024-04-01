import './App.css';
import { useState } from 'react';

function App() {
  
   // 일반 변수는 갑자기 변경되면 html 자동 반영 안됨
  let post = '대전 우동 맛집';
  // 자동으로 html이 재렌더링됨
  let [글제목, 글제목변경] = useState(['남성 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [좋아요, 좋아요변경] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>

      <button onClick={() => {
        let order = [...글제목];
        order.sort();
        글제목변경(order);
      }}>가나다순정렬</button>
       
      <button onClick={() => {
        let copy = [...글제목];
        copy[0] = '여자코트 추천';
        글제목변경(copy);
      }}> ✨ </button>

      {
        글제목.map(function(a, i){
          return (
            <div className="list" key={i}>
              <h4 onClick={ () => { setModal(modal == true ? false : true); setTitle(i)}}>{ a }
                <span onClick={ (e) => {
                    e.stopPropagation();
                    let like = [...좋아요]; 
                    like[i] += 1 
                    좋아요변경(like)
                    }}>💗</span>{ 좋아요[i] }
                    <button onClick={ (e) => {
                      e.stopPropagation();
                      let 글삭제 = [...글제목];
                      글삭제.splice(i, 1);
                      글제목변경(글삭제);
                    }}>삭제</button>
              </h4>
              <p>2월 17일 발행</p>
            </div>  
          )
        })
      }
    
      <input onChange={ (e) => { 입력값변경(e.target.value) }}/>
      <button onClick={() => {
        let textCopy = [...글제목];
        textCopy.unshift(입력값);
        글제목변경(textCopy);
      }}>추가🌞</button>


      {
        modal == true ? <Modal color={'pink'} 타이틀={title} 글제목={글제목} 글제목변경={글제목변경}/> : null
      }
    </div>
  );
}

// div Component
// 장점 1. 반복적인 html 축약할 때 2. 큰 페이지 3. 자주 변경될 때
// 단점 1. state를 가져와 쓸 때
function Modal(props) { 
  return (
    <div className="modal" style={{background : props.color}}>
      <h4>{props.글제목[props.타이틀]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={() => {
        let write = [...props.글제목];
        write[0] = '여자코트추천'
        props.글제목변경(write)
      }}>글수정</button>
    </div>   
  )
}

export default App;
