import React, { useState, useEffect, useRef } from 'react';
import NewTech from '../NewTech/NewTech';
import TechList from '../TechList/TechList';
import robots from '../../bots/robots';
import Scroll from '../TechList/Scroll';
import { uuid } from 'uuidv4';
import { getUserList, findUser } from '../../../utils/utils'

const db = robots;

const Main = ({ userName }) => {
  
  //keep value of prop in variable
  const prevProp = useRef(userName);
  //assign boolen, user exists in db
  const userExists = findUser(userName, db);
  //if the user does not exist, add to db with new user obj
  if(!userExists) db.push({
    id: uuid(), 
    name: userName, 
    email: `${userName}@userName.com`, 
    list: [] 
  });

    //INIT STATE
  //set state, the user's list of techniques
  const [list, setList] = useState(() => getUserList(userName, db));
  //assign true to variable on first render
  let firstRender = useRef(true);


    //STATE FUNCTIONS
  //when we get a new technique, we update state
  const updateList = newTech => setList([...list, newTech]);
  //delete a technique
  const deleteTech = id => {
    let idx;

    list.forEach((tech, i) => {
      if (id.current === tech.id) idx = i
    })

    list.splice(idx, 1)

    setList([...list])
  };
  //edit technique
  const editTech = id => {
    console.log(`how to edit ${id.current}...`)
  }
  
    //USE EFFECT FUNCTIONALITY
  //locate user in db, render their list of techniques
  useEffect(() => {

    //only update firstRender to false if on first render
    if (firstRender.current) return firstRender.current = false;

    //assign user name to variable userName
    const userName = prevProp.current;

    //assign newly added technique to state list to a variable tech
    const tech = list[list.length - 1];

    //initialzie a variable userIdx
    let userIdx;

    //find the index of the user's user obj in the db, update userIdx
    db.forEach((user, i) => {
      if (user.name === userName) userIdx = i;
    })

    //assign current user's data to a variable
    const userData = db[userIdx];

    //add new technique to the current user's list of techniques
    userData.list.push(tech);

  }, [list]);
  

  return (
    <div>
      <h2 className='f2 light-green'>{userName}'s Roll-a-Dex</h2>
      <NewTech updateList={updateList} />
      <Scroll>
        <TechList 
          list={list}
          deleteTech={deleteTech}
          editTech={editTech} 
        />
      </Scroll> 
    </div>
  );
};

export default Main