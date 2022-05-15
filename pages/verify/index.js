import { Center, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react'
import Script from 'next/script';
import VerificationLayout from "../../components/layout/verification.layout";

import Verify from '../../components/VerificationComponents';
import CharacterVerification from '../../components/VerificationComponents/Character';
import NameVerification from '../../components/VerificationComponents/Identity'
import useConnect from '../../controller/hooks/useConnect';




export default function Verification({ user, userDoc }) {
    const { connectDocument: connect } = useConnect(user)
    const [step, setStep] = useState(-1)

    console.log(userDoc)

    const handleSetCurrentStep = () => {
        const { verified, verifiedIdentity } = userDoc
        if (verified) {
            setStep(2)
        } else if (verifiedIdentity) {
            setStep(1)
        } else {
            setStep(0)
        }
    }

    useEffect(() => {
        if (userDoc) handleSetCurrentStep()
    }, [userDoc])


    return (
        <>
            <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core"></Script>
            <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter"></Script>
            <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl"></Script>
            <VerificationLayout>
                {step === -1 ? <Center p={40}><Spinner size={'xl'} /></Center> : <></>}

                {step === 0 ? <Verify setStep={setStep} user={user} /> : <></>}

                {step === 1 ? <NameVerification setStep={setStep} user={user} connect={connect} userDoc={userDoc} /> : <></>}

                {step === 2 ? <CharacterVerification setStep={setStep} user={user} connect={connect} userDoc={userDoc} /> : <></>}
            </VerificationLayout>



        </>
    )
}