import { PrismaClient } from '@prisma/client'
import dotenv, { DotenvParseOutput } from 'dotenv'
import glob from 'glob'

const VIDEO_EXTENSIONS: string[] = [
    'mp4',
]
const IMAGE_EXTENSIONS: string[] = [
    'jpg',
]

const videoFileSearches = [
    '([0-9]{4})/([0-9]{2})/([0-9]{2})/([^_]+)_([^_]+)_([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})\.([a-z0-9]+)',
]

const prismaClient = new PrismaClient({
    // debug: true,
    // log: ['INFO'],
})

async function asyncForEach<T> (array: T[], callback: (item: T, index: number, array: T[]) => Promise<void>) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function main (config: DotenvParseOutput) {
    await prismaClient.connect()

    // get files
    const extensions = [...VIDEO_EXTENSIONS, ...IMAGE_EXTENSIONS]
    const recordingFiles: {
        [key: string]: {
            cameraName: string,
            videoPath: string | undefined,
            imagePath: string | undefined
        }
    } = {}

    const files = glob.sync(`${config.recording_folder}/**/*.+(${extensions.join('|')})`)

    files.forEach((file) => {
        const regExp = new RegExp(videoFileSearches[0])
        const regSearch = regExp.exec(file)
        if (regSearch) {
            const [
                text,
                year,
                month,
                day,
                cameraName,
                cameraId,
                recordingYear,
                recordingMonth,
                recordingDay,
                recordingHours,
                recordingMinutes,
                recordingSeconds,
                extension,
            ] = regSearch
            const recordingDate = new Date()
            recordingDate.setFullYear(parseInt(recordingYear, 10))
            recordingDate.setMonth(parseInt(recordingMonth, 10) - 1)
            recordingDate.setDate(parseInt(recordingDay, 10))
            recordingDate.setHours(parseInt(recordingHours, 10))
            recordingDate.setMinutes(parseInt(recordingMinutes, 10))
            recordingDate.setSeconds(parseInt(recordingSeconds, 10))
            recordingDate.setMilliseconds(0)

            const recordingKey = `${recordingDate.getTime()}`
            if (!recordingFiles[recordingKey]) {
                recordingFiles[recordingKey] = {
                    cameraName,
                    videoPath: undefined,
                    imagePath: undefined,
                }
            }

            if (VIDEO_EXTENSIONS.includes(extension)) {
                recordingFiles[recordingKey].videoPath = text
                
            } else if (IMAGE_EXTENSIONS.includes(extension)) {
                recordingFiles[recordingKey].imagePath = text
            } else {
                console.warn(`Could not parse extension[${extension}] in ${text}`)
            }
        }
    })

    Object.keys(recordingFiles).forEach((date) => {
        const { cameraName, videoPath, imagePath } = recordingFiles[date]
        const recordedAt = new Date(parseInt(date, 10))

        if (videoPath) {
            if (false) {
                // remove
                console.info(`Remove recording: ${videoPath}`)
                // TODO: remove files, and from database
                prismaClient.recording.delete({
                    where: {
                        videoFilePath: videoPath,
                    },
                }).catch(console.error)
            } else {
                // add
                console.info(`Add recording: ${videoPath}`)

                prismaClient.recording.upsert({
                    create: {
                        cameraName,
                        videoFilePath: videoPath,
                        imageFilePath: imagePath,
                        recordedAt,
                    },
                    update: {
                        cameraName,
                        recordedAt,
                    },
                    where: {
                        videoFilePath: videoPath,
                    },
                }).catch(console.error)
            }
        }
    })
}

const result = dotenv.config()

// Start
if (result.parsed) {
    // got config
    main(result.parsed)
    .catch(console.error)
    .finally(async () => {
        await prismaClient.disconnect()
    })
} else if (result.error) {
    console.warn(result.error)
} else {
    console.error('Error config')
}