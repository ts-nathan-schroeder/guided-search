import { ConversationEmbed, SageEmbed, SearchEmbed } from "@thoughtspot/visual-embed-sdk/lib/src/react"
import { useEffect, useRef, useState } from "react"
import { BaseFields, BaseConvoFields } from "./DataDefinitions";
import loadingIcon from "./loading.gif"

interface SearchProps {
    worksheetID: string
}
export const Search = ({worksheetID}:SearchProps) => {
    const [isExistingReport, setIsExistingReport] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [hasLoaded, setHasLoaded] = useState(false);
    const [answerId, setAnswerId] = useState('')
    const [isSage, setIsSage] = useState(false)
    const [sageSearch, setSageSearch] = useState('')

    let ref = useRef<HTMLDivElement>(null);
    let loadingRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        function handleLoad(e: any){
            setIsExistingReport(false);
            setIsSage(false);
            setSearchString(e.detail.data.searchString);
            if (ref && ref.current && loadingRef && loadingRef.current){
                ref.current.style.display="none"
                loadingRef.current.style.display="flex"
                setHasLoaded(true);
            }

        }
        window.addEventListener('loadConvo',  handleLoadConvo)
        function handleLoadConvo(e: any){
            setIsExistingReport(false);
            setIsSage(true);
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
            setIsSage(false);
            setAnswerId(e.detail.data.id);
            if (ref && ref.current && loadingRef && loadingRef.current){
                ref.current.style.display="none"
                loadingRef.current.style.display="flex"
                setHasLoaded(true);
            }
            console.log("report updated",e.detail.data.id)
        }
        window.addEventListener('loadSage',  handleSage)
        function handleSage(e: any){
            setIsSage(true)
            setSageSearch(e.detail.data.searchString);
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
    },[])

    let searchBase = "" 
    if (isSage){
        searchBase = "Show me the following Columns: " + BaseConvoFields.join(", ")

    }else{
        for (var field of BaseFields){
            searchBase+= " ["+field+"]"
        }
        console.log(searchBase,searchString)
    }
    
    return (
        <>
        <div ref={ref} style={{height:'900px',display:isSage?'flex':'none',width:'100%'}}>
            {isSage ?
            <ConversationEmbed 
            searchOptions={{
                searchQuery: searchBase +  searchString,
              }}
              worksheetId={worksheetID}
              onData={() => {
                if (ref && ref.current && loadingRef && loadingRef.current){
                    ref.current.style.display="flex"
                    loadingRef.current.style.display="none"
                }
            }}
              frameParams={{height:'900px',width:'100%'}}
              customizations={{
                style: {
                customCSS: {
                    variables: {
                    "--ts-var-root-background": "#fbfbfb",
                    "--ts-var-viz-border-radius": "25px",
                    },
                    rules_UNSTABLE: {
                        '.eureka-search-bar-module__sageEmbedSearchBarWrapper':{
                            'display': 'none !important'
                        },
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
              ></ConversationEmbed>
:

          
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
                "--ts-var-root-background": "#fbfbfb",
                "--ts-var-viz-border-radius": "25px",
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
        }
        </div>
        
        <div  style={{height:"900px",display:isSage?'none':'flex'}} ref={loadingRef} className="w-full h-full align-center justify-center font-bold text-black pt-40 text-2xl">
            {hasLoaded ? <div className="flex flex-col align-center justify-center items-center">
             <div> LOADING REPORT DATA  </div>
            <img className="w-16 h-16"  src={loadingIcon}></img>
            </div> : 'LOAD A REPORT TO SEE DATA'}
        </div>
        </>
    )
}


interface SageProps {
    worksheetID: string
}
export const SagePlaceholder = ({worksheetID}:SearchProps) => {
    return (
        <div> LOADING REPORT DATA  </div>
    )
}