import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Filters } from './Filters';
import { AuthStatus, AuthType, init, LiveboardEmbed } from '@thoughtspot/visual-embed-sdk';
import { Search } from './Search';
import { SearchEmbed } from '@thoughtspot/visual-embed-sdk/lib/src/react';

const tsURL = "https://se-thoughtspot-cloud.thoughtspot.cloud/"
const worksheetID = "782b50d1-fe89-4fee-812f-b5f9eb0a552d"

function App() {
  const filterRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  init({
    thoughtSpotHost:tsURL,
    authType:AuthType.None
  }).on(AuthStatus.SUCCESS, ()=>{
    setIsLoggedIn(true);
  })


  return (
      <div style={{background:'#fbfbfb'}} className='flex h-full flex flex-col'>
        <div ref={filterRef}>
          {isLoggedIn ? 
            <Filters tsURL={tsURL}></Filters>
        : 
            <div className='w-full h-full text-black flex justify-center text-2xl p-16'>
              Welcome! To use this application please log into the SE Cloud environment.
            </div>
        }
        </div>
        {isLoggedIn ? 
        <Search worksheetID={worksheetID}></Search>
        :
        <SearchEmbed
          frameParams={{width:"100%",height:"100%"}}
          dataSource={"782b50d1-fe89-4fee-812f-b5f9eb0a552d"} />
        }
       </div>
  );
}

export default App;
