// import * as faceapi from '@vladmandic/face-api'


const initializeModel = () => {
    return Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
    ])
}


const loadLabeledImages = async (samples) => {
    const descriptions = []

    for (const sampleIndex = 0; sampleIndex < samples.length; sampleIndex++) {

        const detections = await faceapi.detectSingleFace(samples[sampleIndex])
            .withFaceLandmarks()
            .withFaceDescriptor()

        detections ? descriptions.push(detections.descriptor) : console.log('Insufficient Data')
    }


    return descriptions.length === 0 ? null : [new faceapi.LabeledFaceDescriptors('match', descriptions)]
}


module.exports = {
    handler: async (samples, official) => {

        try {

            await initializeModel().catch(err => { throw err })
            const labeledFaceDescriptors = await loadLabeledImages(samples)


            if (!labeledFaceDescriptors) throw new Error('Photo is too blurry')

            console.log(labeledFaceDescriptors)
            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.5)
            const detections = await faceapi.detectSingleFace(official)
                .withFaceLandmarks()
                .withFaceDescriptor()


            console.log(detections)

            if (!detections) throw new Error('Photo Id is too blurry')
            const results = faceMatcher.matchDescriptor(detections)

            console.log(results)

            return results

        } catch (err) {

            throw err

        }

    }
}