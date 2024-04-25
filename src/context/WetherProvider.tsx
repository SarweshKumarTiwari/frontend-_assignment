import { useState } from 'react'
import { WetherContext, wethertype } from './WeatherContext'

type propTypes={
    children:JSX.Element|JSX.Element[]
}
export default function WetherProvider({children}:propTypes) {
    const [reports, setReports] = useState<wethertype[]>([])
  return (
    <WetherContext.Provider value={{reports,setReports}}>
        {children}
    </WetherContext.Provider>
  )
}
