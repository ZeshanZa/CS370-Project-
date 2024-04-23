"use client"

import React, { useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import Layout from '../Layouts/Layout'
import MatchRequestsPageComponent from '../match-requests/MatchRequestsPageComponent'
import StartMatchingPageComponent from '../startMatching/StartMatchingPageComponent'
import MatchesPageComponent from '../matches/MatchesPageComponent'

function MatchingPage() {
    const [tabValue, setTabValue] = useState(0)
    
    return (
        <Layout>
            <div className='w-full h-full'>
                <Tabs centered value={tabValue} indicatorColor='primary' variant='fullWidth' onChange={(event: React.SyntheticEvent, newValue: number) => {
                                                                                                setTabValue(newValue);
                                                                                            }}>
                    <Tab label="Matching"/>
                    <Tab label="Requests"/>
                    <Tab label="Matches"/>
                </Tabs>
                {tabValue == 0 ? <div className='w-full h-full mt-10 flex justify-center flex-col'>
                    <StartMatchingPageComponent />
                </div> : ""}
                {tabValue == 1 ? <div className='w-full h-full mt-10 flex justify-center flex-col'>
                    <MatchRequestsPageComponent />
                </div> : ""}
                {tabValue == 2 ? <div className='w-full h-full mt-10 flex justify-center flex-col'>
                    <MatchesPageComponent />
                </div> : ""}
            </div>
        </Layout>
    )
}

export default MatchingPage