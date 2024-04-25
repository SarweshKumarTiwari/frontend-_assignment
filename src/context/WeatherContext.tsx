import React, { createContext } from "react";

export type wethertype={
    city:string
    country:string
    temprature:number
    humidity:number
    wind_speed:number
}

type contextType={
    reports:wethertype[]
    setReports:React.Dispatch<React.SetStateAction<wethertype[]>>
}

export const WetherContext=createContext<contextType>({reports:[],setReports:()=>{}})