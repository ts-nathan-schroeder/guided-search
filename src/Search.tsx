import { SearchEmbed } from "@thoughtspot/visual-embed-sdk/lib/src/react"
import { useEffect, useRef, useState } from "react"
import { BaseFields } from "./DataDefinitions";
import loadingIcon from "./loading.gif"

interface SearchProps {
    worksheetID: string
}
export const Search = ({worksheetID}:SearchProps) => {
    const [isExistingReport, setIsExistingReport] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [hasLoaded, setHasLoaded] = useState(false);
    const [answerId, setAnswerId] = useState('')

    let ref = useRef<HTMLDivElement>(null);
    let loadingRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        function handleLoad(e: any){
            setIsExistingReport(false);
            setSearchString(e.detail.data.searchString);
            if (ref && ref.current && loadingRef && loadingRef.current){
                ref.current.style.display="none"
                loadingRef.current.style.display="flex"
                setHasLoaded(true);
            }
        }
        window.addEventListener('loadReport',  handleLoad)
        function handleLoadExisting(e: any){
            setIsExistingReport(true);
            setAnswerId(e.detail.data.id);
            if (ref && ref.current && loadingRef && loadingRef.current){
                ref.current.style.display="none"
                loadingRef.current.style.display="flex"
                setHasLoaded(true);
            }
        }
        window.addEventListener('loadExistingReport', handleLoadExisting)
    
        return () => {
            window.removeEventListener("loadExistingReport", handleLoadExisting)
            window.removeEventListener("loadReport", handleLoad)
        };
    })

    let searchBase = "";//"[Week ID].'202327'";
    for (var field of BaseFields){
        searchBase+= " ["+field+"]"
    }
    console.log(searchBase,searchString)
    return (
        <>
        <div ref={ref} style={{height:'900px',display:'none',width:'100%'}}>
        <SearchEmbed
        searchOptions={isExistingReport ? undefined : {
            searchTokenString: searchString ? searchBase + searchString : '',
            executeSearch: true
        }}
        answerId={isExistingReport ? answerId : undefined}

        customizations={{
            style: {
            customCSS: {
                variables: {
                "--ts-var-root-background": "rgb(71 85 105)",
                "--ts-var-viz-border-radius": "25px",
                "--ts-var-viz-box-shadow":"0px"
                },
                rules_UNSTABLE: {
                    '[data-testid="pinboard-header"]': {
                        'display': 'none !important'
                    },
                    '.ReactModalPortal .ReactModal__Overlay':{
                        'background-color': '#ffffff00 !important'
                    },
                    '.answer-module__searchCurtain':{
                        'background-color': '#ffffff00 !important'
                    }
                }
                
            }
            }
        }}

        

        //runtimeFilters={runtimeFilters}
        forceTable={true}
        dataSource={worksheetID}
        onData={() => {
            if (ref && ref.current && loadingRef && loadingRef.current){
                ref.current.style.display="flex"
                loadingRef.current.style.display="none"
            }
        }}
        frameParams={{height:'900px',width:'100%'}}></SearchEmbed>
        </div>
        
        <div  style={{height:"900px"}} ref={loadingRef} className="w-full flex h-full align-center justify-center bg-slate-600 font-bold text-white pt-40 text-2xl">
            {hasLoaded ? <div className="flex flex-col align-center justify-center items-center">
             <div> LOADING REPORT DATA  </div>
            <img className="w-16 h-16"  src={loadingIcon}></img>
            </div> : 'LOAD A REPORT TO SEE DATA'}
        </div>
        </>
    )
}