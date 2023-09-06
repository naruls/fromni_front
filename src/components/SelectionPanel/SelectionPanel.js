import React from 'react';
import './SelectionPanel.css';

function SelectionPanel(props) {
  const [disablButton, setDisablButton] = React.useState(true);

  function chose(evt, channel) {
    if(evt.target.checked===true) {
      props.setCheckboxQueue([...props.checkboxQueue, channel])
    } else {
      props.setCheckboxQueue(props.checkboxQueue.filter(item=> item !== channel))
    }
    setDisablButton(false);
  }

  function chooseVK(evt) {
    chose(evt, 'vk');
  }

  function chooseWA(evt) {
    chose(evt, 'whatsapp');
  }

  function chooseTG(evt) {
    chose(evt, 'telegram');
  }

  function chooseSMS(evt) {
    chose(evt, 'sms');
  }

  function save(evt) {
    evt.preventDefault();
    setDisablButton(true);
    props.setVisibility(true)
  }


  return (
    <div className={props.visibility ? "selection-panel selection-panel_disabled" : "selection-panel"}>
      <p className='selection-panel__description'>Выберите каналы отправки сообщений в необходимом порядке</p>
      <form className='selection-panel__form' id='channel-queue-form'>
        <ul className='selection-panel__channels'>
          <li className='selection-panel__channel'>ВКонтакте<input className='selection-panel__checkbox' type='checkbox' onChange={chooseVK} checked={props.checkboxQueue.includes('vk')}/>{props.checkboxQueue.includes('vk') ? `${props.checkboxQueue.indexOf('vk')+1}` : ''}</li>
          <li className='selection-panel__channel'>WhatsApp<input className='selection-panel__checkbox' type='checkbox' onChange={chooseWA} checked={props.checkboxQueue.includes('whatsapp')}/>{props.checkboxQueue.includes('whatsapp') ? `${props.checkboxQueue.indexOf('whatsapp')+1}` : ''}</li>
          <li className='selection-panel__channel'>Telegram<input className='selection-panel__checkbox' type='checkbox' onChange={chooseTG} checked={props.checkboxQueue.includes('telegram')}/>{props.checkboxQueue.includes('telegram') ? `${props.checkboxQueue.indexOf('telegram')+1}` : ''}</li>
          <li className='selection-panel__channel'>SMS<input className='selection-panel__checkbox' type='checkbox' onChange={chooseSMS} checked={props.checkboxQueue.includes('sms')}/>{props.checkboxQueue.includes('sms') ? `${props.checkboxQueue.indexOf('sms')+1}` : ''}</li>
        </ul>
        <button className='selection-panel__save-button' disabled={disablButton} onClick={save}>Сохранить</button>
      </form>
    </div>
  );
}

export default SelectionPanel;
