const tf = require('@tensorflow/tfjs-core')
const faceapi = require('@vladmandic/face-api')
const canvas = require('canvas')


const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })



const initializeModel = () => {
    return Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromDisk('./utils/verification/models'),
        faceapi.nets.faceLandmark68Net.loadFromDisk('./utils/verification/models'),
        faceapi.nets.ssdMobilenetv1.loadFromDisk('./utils/verification/models')
    ])
}


const loadLabeledImages = async (samples) => {
    const descriptions = []

    for (const sampleIndex = 0; sampleIndex < samples.length; sampleIndex++) {

        const image = await canvas.loadImage(samples[sampleIndex])
        const detections = await faceapi.detectSingleFace(image)
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

            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.5)
            const image = await canvas.loadImage(official)
            const detections = await faceapi.detectSingleFace(image)
                .withFaceLandmarks()
                .withFaceDescriptor()

            if (!detections) throw new Error('Photo ID is tii blurry')
            const results = faceMatcher.matchDescriptor(detections)

            console.log(results)

            return results

        } catch (err) {

            throw err

        }

    }
}