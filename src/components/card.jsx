import {useEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';

import { Api } from '../api'

export const Card = () => {

  const [card, setcard] = useState({});
  const location = useLocation();
  const query = qs.parse(location.search.replace(/^\?/, ''));
  const history = useHistory();


  useEffect(() => {
    Api
      .getCharacter({id: query.id })
      .then(res => {
        setcard(res.data)
      })
      .catch(e => {
        setcard({})
      })
  }, [query.id]);

  return (
    <>
    <button 
      onClick={() => {
        history.goBack();
      }}>
        назад
      </ button >
      <div>
        {JSON.stringify(card)}
      </div>
   </>
  )
}