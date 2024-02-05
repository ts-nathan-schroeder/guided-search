import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Filters } from './Filters';
import { AuthType, init } from '@thoughtspot/visual-embed-sdk';
import { Search } from './Search';

const tsURL = "https://se-thoughtspot-cloud.thoughtspot.cloud/"
const worksheetID = "782b50d1-fe89-4fee-812f-b5f9eb0a552d"

function App() {
  const filterRef = useRef<HTMLDivElement>(null);

  init({
    thoughtSpotHost:tsURL,
    authType:AuthType.None
  })

  return (
      <div  className='h-full flex bg-slate-600 flex-col'>
      <div ref={filterRef}>
      <Filters tsURL={tsURL}></Filters>
      </div>
      <Search worksheetID={worksheetID}></Search>
      </div>
  );
}

export default App;
