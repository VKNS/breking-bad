import {useEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';

import { Api } from '../api'
import {constructUrl} from '../utils'
import {
  defaultOffset,
  defaultlimit,
  maxCharacters,
  limitList
} from '../constants'




export const List = () => {

  const history = useHistory();
  const location = useLocation();
  const currentPath = location.pathname;
  const query = qs.parse(location.search.replace(/^\?/, ''));
  const [name1, setname1] = useState("");
  const [list, setlist] = useState([]);
  const [isShown, setisShown] = useState(false);
  const [isloading, setisloading] = useState(false);


  

  useEffect(() => {

    history.push(constructUrl(currentPath, { 
      offset: query.offset || defaultOffset, 
      limit: query.limit || defaultlimit, 
    }));
 
  }, []);

  useEffect(() => {
    setisloading(true)
    Api
      .getList({
        limit: query.limit,
        offset: query.offset,
        ...(!!query.name && {name: query.name})
      })
      .then(res => {
        setlist(res.data)
      })
      .finally(() => setisloading(false))
      .catch(e => {
        setlist([])
      })
  }, [query.limit, query.offset, query.name]);


  return (
    <div>
      <button 
        onClick={() => setisShown(!isShown)}
      > 
        фильтр
      </button>
      {isShown && <div>
      <input
        placeholder="Search"
        value={name1}
        onChange={e => setname1(e.target.value)}
      />

      <button 
        disabled={!name1 || isloading}
        onClick={() => {
          if (!query.name) {
            history.push(constructUrl(currentPath, { 
              ...query,
              name: name1
            }));
          } else {
            history.push(constructUrl(currentPath, { 
              ...query,
              name: ""
            }));
            setname1("")
          }
        }}>
        {!query.name ? "лупа" : "крестик"}
      </ button>
      </div>}

      <table>
        <thead>
          <tr>
            <th>идентификатор</th>
            <th>имя</th>
            <th>дата рождения</th>
          </tr>
          </thead>
          <tbody>
            {
              list.map((item) => (
                <tr key={item.char_id} onClick={() => {
                  history.push(constructUrl("/card", { 
                    id: item.char_id
                  }));
                }}>
                  <td>
                    {item.char_id}
                  </td>
                  <td>
                    {item.name}
                  </td>
                  <td>
                    {item.birthday}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <button 
          disabled={!!(+query.offset === 0) || isloading}
          onClick={() => {
            history.push(constructUrl(currentPath, { 
              ...query,
              offset: +query.offset - +query.limit <= 0 ? 0 : +query.offset - +query.limit, 
            }));
          }}  
        >
        {"<"}
        </button>
        <button 
          disabled={!!(+query.offset + +query.limit > maxCharacters) || isloading}
          onClick={() => {
            history.push(constructUrl(currentPath, { 
              ...query,
              offset: +query.offset + +query.limit , 
            }));
          }}
        >
          {">"}
        </button>

        <select 
          name="country" 
          value={query.limit} 
          onChange={(e) => {
            history.push(constructUrl(currentPath, { 
              ...query,
              limit: e.target.value
            }));
          }}  
        >
          {
            limitList.map(limit => (
              <option key={limit} value={limit}>{limit}</option> 
            ))
          }
          
        </select>
    </div>
  )
}