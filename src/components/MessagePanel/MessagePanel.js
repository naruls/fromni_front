import React from 'react';
import './MessagePanel.css';
import config from '../../utils/const'

function MessagePanel(props) {

  const [hotKeys, setHotKeys] = React.useState([]);
  const [hotKey, setHotKey] = React.useState('');
  const [mainText, setMainText] = React.useState('');
  const [hotKeyType, setHotKeyType] = React.useState('message');
  const [hotKeysNumber, setHotKeysNumber] = React.useState({messages:0 , links:0});
  const [display, setDisplay] = React.useState('standardDisplay');



  function hotKeyInput(e) {
    setHotKey(e.target.value)
  }

  function mainTextChange(e) {
    setMainText(e.target.value);
  }

  function hotKeyChoose(e) {
    setHotKeyType(e.target.value)
  }

  function addQuickMessageText(e) {
    setMainText(mainText+e.target.textContent)    
  }

  function displayChoose(e) {
    setDisplay(e.target.value)
    setHotKeys([])
  }

  function addHotKey() {
    setHotKeys([...hotKeys, {name:hotKey, type:hotKeyType},]);
    if(hotKeyType === 'message') {
      setHotKeysNumber({...hotKeysNumber, messages: hotKeysNumber.messages+1})
    } else {
      setHotKeysNumber({...hotKeysNumber, links: hotKeysNumber.links+1})
    }
    setHotKey('');
  }

  function submit(evt) {
    evt.preventDefault();
    props.saveConfis({messageText:  mainText, channel: props.checkboxQueue[0], display: display, hotKeys: hotKeys})
    setHotKeys([]);
    setMainText('');
    if (props.checkboxQueue.length === 1) {
      props.setVisibility(false);
    }
    props.setCheckboxQueue(props.checkboxQueue.slice(1))
  }


  return (
    <div className={props.visibility ? "message-panel" : "message-panel_hidden"}>
      <h2 className='message-panel__title'>Настройка сообщения для {props.checkboxQueue[0]}</h2>
      <form className='message-panel__form'>
        <textarea  className='message-panel__text-input' value={mainText} onChange={mainTextChange} placeholder={`Текст сообщения. Максимальная длинна - ${props.checkboxQueue[0] && config[props.checkboxQueue[0]].maxSymbols}.`}></textarea>
        <p className='message-panel__options-title'>Настройка клавиатуры:</p>
        <div className='message-panel__options-block'>
          <div className='message-panel__options-display-block'>
            <p className='message-panel__options-display-title'>Вид отображения быстрых сообщений:</p>
            <div className='message-panel__options-display-radio-group'>
              <div className='message-panel__options-display-radio-group-item'>
                <input id="radio-standart" className='message-panel__options-display-button' value='standardDisplay' name="display" type='radio' onChange={displayChoose} defaultChecked='true'/>
                <label htmlFor="radio-standart">Стандартное</label>
              </div>
              <div className='message-panel__options-display-radio-group-item'>
                <input id="radio-inline" className='message-panel__options-display-button' value='inlineDisplay' name="display" type='radio' onChange={displayChoose}/>
                <label htmlFor="radio-inline">Inline</label>
              </div>
            </div>
          </div>
          <div className='message-panel__options-buttons-block'>
            <p className='message-panel__options-buttons-title'>Создание кнопок. Максимально количество кнопок - {props.checkboxQueue[0] && config[props.checkboxQueue[0]][display].maxKeys}, среди которых можно {props.checkboxQueue[0] && config[props.checkboxQueue[0]][display].allowKeysLink} ссылок:</p>
            <input className='message-panel__options-buttons-input' placeholder={`Максимальная длина - ${props.checkboxQueue[0] && config[props.checkboxQueue[0]][display].maxMessageLength}.`} onChange={hotKeyInput} value={hotKey} maxLength={props.checkboxQueue[0] && config[props.checkboxQueue[0]][display].maxMessageLength}/>
            <div className='message-panel__options-display-radio-group'>
              <div className='message-panel__options-display-radio-group-item'>
                <input id="radio-hot-key" className='message-panel__options-display-button' value="message" name="hot-keys" type='radio' onChange={hotKeyChoose} defaultChecked='true'/>
                <label htmlFor="radio-hot-key">Быстрое сообщение</label>
              </div>
              <div className='message-panel__options-display-radio-group-item'>
                <input id="radio-link" className='message-panel__options-display-button' value="link" name="hot-keys" type='radio' onChange={hotKeyChoose}/>
                <label htmlFor="radio-link">Ссылка</label>
              </div>
            </div>
            <button className='message-panel__options-buttons-add-button' type='button' onClick={addHotKey} disabled={((hotKeyType === 'message' && hotKeysNumber.messages>=(props.checkboxQueue[0] && config[props.checkboxQueue[0]][display].maxKeys)) || (hotKeyType === 'link' && hotKeysNumber.links>=(props.checkboxQueue[0] && config[props.checkboxQueue[0]][display].allowKeysLink)) || (hotKeysNumber.messages+hotKeysNumber.links>=(props.checkboxQueue[0] && config[props.checkboxQueue[0]][display].maxKeys))) ? true : false}>Добавить</button>
          </div>
          <ul className='message-panel__options-hot-keys'>
            {hotKeys.map((data, id) => {
              return <li key={id} className={data.type === 'message' ? '  message-panel__options-hot-key message-panel__options-hot-key_message' : 'message-panel__options-hot-key message-panel__options-hot-key_link'}>
                {data.type === 'message' ? <div onClick={addQuickMessageText} value={data.name}>{data.name}</div> : <a href={data.name} rel='noreferrer' target="_blank">{data.name}</a>}
              </li>
            })}
          </ul>
        </div>
        <button className='message-panel__submit-button' type='submit' onClick={submit}>Сохранить</button>
      </form>
    </div>
  );
}

export default MessagePanel;
