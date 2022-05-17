const faceapi = require('./face-api.min.js')
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

const recognize = async (resolve, reject, samples, official) => {

    try {
        const labeledFaceDescriptors = await loadLabeledImages(samples)

        if (labeledFaceDescriptors) {
            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
            const image = await canvas.loadImage(official)
            const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()

            if (detections) {
                const results = detections.map(d => faceMatcher.matchDescriptor(d))
                console.log(results)
                resolve(results)
            } else {
                throw new Error('Low Quality ID Picture')
            }
        } else {
            throw new Error('Low Quality Photos')
        }


    } catch (err) {

        console.log(err)
        reject(err)


    }


}


const loadLabeledImages = async (samples) => {
    const descriptions = []

    for (var sampleIndex = 0; sampleIndex < samples.length; sampleIndex++) {
        const image = await canvas.loadImage(samples[sampleIndex])


        console.log(sampleIndex)
        const detections = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor()

        detections ? descriptions.push(detections.descriptor) : console.log('LOW QUALITY')

    }

    return descriptions.length === 0 ? null : [new faceapi.LabeledFaceDescriptors('match', descriptions)]
}


module.exports = {
    handler: async (samples, official) => {

        try {
            await initializeModel().catch(err => { throw err })

            const labeledFaceDescriptors = await loadLabeledImages([samples[0]])

            if (!labeledFaceDescriptors) throw new Error('Photo is too blurry')
            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
            const image = await canvas.loadImage(official)
            const detections = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor()


            if (!detections) throw new Error('Photo ID is too blurry')

            const results = faceMatcher.matchDescriptor(detections)

            return results
        } catch (error) {

            throw error
        }


    }
}
