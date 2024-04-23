"use client"

import React, { useState } from 'react'
import Matches from "../startMatching/Page"
import { Tab, Tabs } from '@mui/material'
import Layout from '../Layouts/Layout'
import MatchesList from "../match-requests/Page"
import MatchesList2 from '../matches/Page'

function page() {
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
                    <Matches />
                </div> : ""}
                {tabValue == 1 ? <div className='w-full h-full mt-10 flex justify-center flex-col'>
                    <MatchesList />
                </div> : ""}
                {tabValue == 2 ? <div className='w-full h-full mt-10 flex justify-center flex-col'>
                    <MatchesList2 />
                </div> : ""}
            </div>
        </Layout>
    )
}

export default page