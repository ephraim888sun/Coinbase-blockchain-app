import React, {useState, useEffect} from 'react';
import Header from '../components/Header'
import styled from 'styled-components';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import { ethers } from 'ethers';
import { ThirdwebSDK } from '@3rdweb/sdk';

const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        process.env.NEXT_PUBLIC_METAMASK_KEY,
        ethers.getDefaultProvider(
            'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
        )
    )
)


const Dashboard = ({ address }) => {
    const [sanityTokens, setSanityTokens] = useState([])
    const [thirdWebTokens, setThirdWebTokens] = useState([])

    useEffect(() => {
        const getSanityAndThirdWebTokens = async () => {
            const coins = await fetch(
                "https://bp3ckv8r.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D'coins'%5D%20%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractaddress%2C%0A%20%20symbol%2C%0A%20%20logo%2C%0A%20%20%7D"
            )
            const sanityTokens = (await coins.json()).result
            setSanityTokens(sanityTokens)

            setThirdWebTokens(
                sanityTokens.map(token => sdk.getTokenModule(token.contractaddress))
            )
        }
        return getSanityAndThirdWebTokens()
    }, [])
    // console.log('Sanity', sanityTokens)
    // console.log('Thirdweb', thirdWebTokens)

    return (
        <Wrapper>
            <Sidebar />
            <MainContainer>
                <Header 
                walletAddress={address}
                sanityTokens={sanityTokens} 
                thirdWebTokens={thirdWebTokens}
                />
                <Main 
                walletAddress={address}
                sanityTokens={sanityTokens} 
                thirdWebTokens={thirdWebTokens}
                />
            </MainContainer>
        </Wrapper>
    )
}

export default Dashboard

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    background-color; #0a0b0d;
    color: white;
    overflow: hidden;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`

const MainContainer = styled.div`
    flex: 1;
`