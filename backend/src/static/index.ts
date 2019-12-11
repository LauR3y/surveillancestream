import http from 'http'
import nodeStatic from 'node-static'
import dotenv, { DotenvParseOutput } from 'dotenv'
import path from 'path'
import fs from 'fs'
import { Photon } from '@prisma/photon'

const server = new nodeStatic.Server('./dist/static/public', { indexFile: 'index.html' })
// server.serveFile('/video', 200, {}, req, resp)

const main = async (config: DotenvParseOutput) => {    
    http.createServer((request, response) => {
        request.addListener('end', function () {
            console.warn(request.url)
            // server.serve(request, response, (err) => {
            //     console.error(err)
            // })
            server.serve(request, response, (err) => {
                const photon = new Photon({
                    // debug: true,
                    // log: ['INFO'],
                })

                if (request.url) {
                    const matches = request.url.match(/\/(video|poster)\/(.*)/)

                    if (matches) {
                        const [
                            text,
                            type,
                            id,
                        ] = matches

                        photon.recordings.findOne({
                            where: {
                                id,
                            }
                        }).then((recording) => {
                            if (recording) {
                                console.warn(recording)

                                const pathVideo = path.normalize(`${config.recording_folder}/${recording.videoFilePath}`)
                                const pathPoster = path.normalize(`${config.recording_folder}/${recording.imageFilePath}`)

                                if (type === 'video' && fs.existsSync(pathVideo)) {
                                    const fileContent = fs.readFileSync(pathVideo)
                                    response.setHeader('content-type', 'image/mpeg')
                                    response.statusCode = 200
                                    response.write(fileContent, 'binary')
                                    response.end();
                                } else if (type === 'poster' && fs.existsSync(pathPoster)) {
                                    const fileContent = fs.readFileSync(pathPoster)
                                    response.setHeader('content-type', 'image/mpeg')
                                    response.statusCode = 200
                                    response.write(fileContent, 'binary')
                                    response.end();
                                } else {
                                    response.statusCode = 500
                                    response.end();
                                }
                            }
                        })
                        .catch(console.error)
                        .finally(() => {
                            photon.disconnect().catch(console.error)
                        })

                    } else {
                        response.statusCode = 500
                        response.end();
                    }
                } else {
                    response.statusCode = 500
                    response.end();
                }
            })
        }).resume();
    }).listen(3001);
}



const result = dotenv.config()

// Start
if (result.parsed) {
    // got config
    main(result.parsed)
    .catch(console.error)
} else if (result.error) {
    console.warn(result.error)
} else {
    console.error('Error config')
}