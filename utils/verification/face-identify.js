const faceapi = require('face-api.js')
const { Blob } = require('buffer')

const initializeModel = () => {
    return Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromDisk('./utils/verification/models').catch(err => { throw err }),
        faceapi.nets.faceLandmark68Net.loadFromDisk('./utils/verification/models').catch(err => { throw err }),
        faceapi.nets.ssdMobilenetv1.loadFromDisk('./utils/verification/models').catch(err => { throw err })
    ])
}

const recognize = async (resolve, reject, samples, official) => {

    try {
        const labeledFaceDescriptors = await loadLabeledImages(samples)
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)

        console.log(official)
        const blob = new Blob(official.data)
        const image = await faceapi.bufferToImage(official)
        const detections = await faceapi.detectAllFaces(image)
            .withFaceLandmarks()
            .withFaceDescriptors()

        console.log(detections)
        const results = detections.map(d => faceMatcher.matchDescriptor(d))

        console.log(results)

        resolve(results)

    } catch (err) {

        console.log(err)
        reject(err)


    }


}


const loadLabeledImages = (samples) => {
    const labels = ['match']
    return Promise.all(
        labels.map(async label => {
            const descriptions = []

            for (var sampleIndex = 1; sampleIndex < samples.length; sampleIndex++) {

                // console.log()
                const image = await faceapi.bufferToImage(samples[sampleIndex])
                const detections = await faceapi.detectSingleFace(image)
                    .withFaceLandmarks()
                    .withFaceDescriptor()

                descriptions.push(detections.descriptor)
            }

            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}


module.exports = {
    handler: async (samples, official) => {

        return new Promise((resolve, reject) => {
            initializeModel()
                .then(() => recognize(resolve, reject, samples, official))
                .catch((err) => reject(err))
        })
    }
}
