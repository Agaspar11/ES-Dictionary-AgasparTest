import React from 'react'
import Menu from '../Projects/Dashboard 1 components/Menu'
import Statistics from '../Projects/Dashboard 1 components/Statistics'
import '../Projects/Dashboard 1 components/Menu.css'
import '../Projects/Dashboard 1 components/content_statistics.css'
export default function Dashboard({progress , saveprogress , searchCount , saveCount }) { 

    return (
       <>
           <Menu progress={progress} saveprogress={saveprogress} searchCount={searchCount} saveCount={saveCount}/>
           <Statistics />
    </>
    )
}