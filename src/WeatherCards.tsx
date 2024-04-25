import React, { useContext } from 'react'
import { WetherContext } from './context/WeatherContext'

export default function WeatherCards() {
    const {reports}=useContext(WetherContext)
    return (
        reports.length?<div className="m-auto w-full sm:w-[54%] p-2 grid grid-flow-row  md:grid-cols-3 max-sm:space-y-1">
            {reports.map((e,i)=>
            <div className="m-2 p-2 rounded-md shadow-md bg-gray-800 " key={i}>
                <h3 className="text-white text-xl">
                   {e.city}
                </h3>
                <div className="flex justify-between items-center">
                    <p className="text-[12px] w-full text-white">
                        {e.country}
                    </p>
                    <p className=" w-full text-center text-white text-[11px]">Wind</p>
                </div>
                <div className="mt-2 flex justify-between items-center">
                    <h3 className="text-2xl text-white">
                        {e.temprature} &deg; <span className="text-[13px]">C</span>
                    </h3>
                    <p className="text-white text-xl">
                        {e.wind_speed} km/h
                    </p>
                </div>
                <div className="mt-2 flex space-x-3 items-center">
                    <p className="text-white text-[14px]">
                        Humidity
                    </p>
                    <p className="text-white text-[12px]">
                        {e.humidity}%
                    </p>
                </div>
            </div>)}

        </div>:null
    )
}
