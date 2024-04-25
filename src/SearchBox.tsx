import {useState,useMemo, useContext} from 'react'
import { WetherContext } from './context/WeatherContext'

type locationType={
    name:string
    country:string
    latitude:number
    longitude:number
}
export default function SearchBox() {
    const [searchText, setsearchText] = useState('');
    const [location, setlocation] = useState<locationType[]>([]);
    const {reports,setReports}=useContext(WetherContext);

    const filteredResult=useMemo(()=>{
        return location.filter(e=>e.name.toLowerCase().includes(searchText.toLowerCase()))
    },[searchText,location])

    const delay=useMemo(()=>debounce(getCities,300),[])

    async function getCities(nameName:string) {
        try {
            if (!nameName.trim()||!(nameName.length>3)) {
                return
            }
            const json=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${nameName}&count=5&language=en&format=json`) 
            const data=await json.json();
            if (data.results) {
                setlocation(data.results)
            }
            
        } catch (error) {
            setlocation([])
        }
    }

    async function addCities(params:locationType) {
        try {
            const url=`https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,wind_speed_10m`
            const data=await fetch(url);
            const result=await data.json();
            setReports([
                ...reports,
                {
                    city:params.name,
                    country:params.country,
                    humidity:result.current.relative_humidity_2m,
                    temprature:result.current.temperature_2m,
                    wind_speed:result.current.wind_speed_10m

                }
            ])
            setlocation([]);
        } catch (error) {
            setReports([...reports])
        }
    }

    function debounce(fn:(data:string)=>void,timer:number){
        let time:NodeJS.Timeout;
        return function (data:string){
            clearTimeout(time);
            time=setTimeout(()=>fn(data),timer)
        }
    }


    return (
        <div className=' m-auto mt-6 w-full sm:w-[44%] p-2 '>
            <div className="relative  w-full ">
                <div className="p-3 flex space-x-6 items-center bg-[hsl(0deg 0% 100% / 95%)] rounded-[4px] bg-gray-50 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-gray-600" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                    <input type="text" value={searchText} onChange={e=>{
                        delay(e.target.value)
                        setsearchText(e.target.value);
                    }} className="w-full text-gray-600 outline-none border-0 bg-gray-50 text-md" placeholder='Search location to find weather' />
                </div>
                {searchText.length?<div className="absolute bg-white w-full top-[49px]  border border-gray-200 ">
                    {filteredResult.map((e,i)=>
                    <button onClick={()=>addCities(e)} className='w-full p-2 border-b flex flex-col space-y-1 border-gray-200' key={i}>
                        <h4 className='text-lg'>
                            {e.name}
                        </h4>
                        <p className="text-sm text-gray-400">
                            {e.country}
                        </p>
                    </button>
                    )}
                </div>:null}
            </div>
        </div>
    )
}
