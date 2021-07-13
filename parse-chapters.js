const _ = require('lodash')
const fs = require('fs')

let fileName = process.argv[2]
let outFileName = `${fileName}.timestamps`
const obj = JSON.parse(fs.readFileSync(fileName, 'utf8'))

fs.unlinkSync(outFileName)

let lines = _.reduce(
    _.map(
        _.get(obj, 'chapters', []),
        chapter => {
            let hours = _.padStart(Math.floor(chapter.start_time / 3600), 2, '0')
            let minutes = _.padStart(Math.floor((chapter.start_time / 60) % 60), 2, '0')
            let seconds = _.padStart(chapter.start_time % 60, 2, '0')
            return {
                time: `${hours}:${minutes}:${seconds}`,
                title: chapter.title
            }
        }
    ),
    (result, value) => {
        let line = `${value.time} - ${value.title}`

        fs.appendFile(outFileName, `${line}\n`, function (err) {
            if (err) return console.log(err);
        });
        result.push(line)

        return result
    },
    []
)
